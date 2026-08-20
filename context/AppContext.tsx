import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Platform } from "react-native";
import storageService from "@/services/storage";
import { AppContextType } from "@/types/app";

/**
 * Firebase, Google tarafından sunulan ve mobil (iOS/Android) ile web uygulamalarının backend (arka plan) ihtiyaçlarını tek bir platform üzerinden karşılayan bir BaaS (Backend-as-a-Service) platformudur.

Kendi sunucunuzu kurup yönetmek, veritabanı altyapısı ayarlamak veya karmaşık kimlik doğrulama sistemleri yazmak yerine, hazır API ve SDK'lar aracılığıyla doğrudan uygulamanıza entegre edebileceğiniz bulut tabanlı araçlar sunar.
 * 
 */


// Silence Firebase modular API deprecation warnings
(globalThis as any).RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import auth from "@react-native-firebase/auth";
import crashlytics from "@/services/error-handling/crashlytics";
import messaging from "@/services/messaging";
import analytics from "@/services/analytics";
import inAppMessaging from "@/services/messaging/in-app-messaging";
import payment from "@/services/payment";
import { useOnboarding } from "@/hooks/useOnboarding";
import { getLocales } from "expo-localization";
import { changeLanguage } from "@/services/i18n";
import { colorScheme } from "nativewind";
import * as TrackingTransparency from "expo-tracking-transparency";

const AppContext = createContext<AppContextType | undefined>(undefined);

const LANGUAGE_KEY = "language";
const COLOR_SCHEME_KEY = "colorScheme";
const TRACKING_REQUESTED_KEY = "tracking_requested";

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setAppLanguage] = useState<string>(
    getLocales()[0].languageCode || "en"
  );
  const [userColorScheme, setUserColorScheme] = useState<
    "light" | "dark" | "system"
  >("system");
  const { hasSeenOnboarding } = useOnboarding();

  // Request Tracking Permission
  useEffect(() => {
    const requestTracking = async () => {
      try {
        if (Platform.OS !== "ios") return;

        const hasRequested = await storageService.getItem(
          TRACKING_REQUESTED_KEY
        );
        if (hasRequested) return;

        const available = await TrackingTransparency.isAvailable();
        if (!available) return;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { status } =
          await TrackingTransparency.requestTrackingPermissionsAsync();

        await analytics.logEvent("tracking_permission_response", {
          status: status,
        });

        await storageService.setItem(TRACKING_REQUESTED_KEY, "true");
      } catch (error) {
        console.error("Error requesting tracking permission:", error);
        crashlytics.recordError(error as Error);
      }
    };

    requestTracking();
  }, []);

  // Initialize stored language
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const storedLang = await storageService.getItem(LANGUAGE_KEY);
        if (storedLang) {
          setAppLanguage(storedLang);
          changeLanguage(storedLang);
        }
      } catch (error) {
        console.error("Error loading stored language:", error);
        crashlytics.recordError(error as Error);
      }
    };

    initLanguage();
  }, []);

  const setLanguage = async (newLanguage: string) => {
    try {
      await storageService.setItem(LANGUAGE_KEY, newLanguage);
      setAppLanguage(newLanguage);
      changeLanguage(newLanguage);
    } catch (error) {
      console.error("Error setting language:", error);
      crashlytics.recordError(error as Error);
    }
  };

  // Initialize stored color scheme
  useEffect(() => {
    const initColorScheme = async () => {
      try {
        const storedScheme = await storageService.getItem(COLOR_SCHEME_KEY);
        if (storedScheme) {
          setUserColorScheme(storedScheme as "light" | "dark" | "system");
          colorScheme.set(storedScheme as "light" | "dark" | "system");
        }
      } catch (error) {
        console.error("Error loading stored color scheme:", error);
        crashlytics.recordError(error as Error);
      }
    };

    initColorScheme();
  }, []);

  const setColorScheme = async (newScheme: "light" | "dark" | "system") => {
    try {
      await storageService.setItem(COLOR_SCHEME_KEY, newScheme);
      setUserColorScheme(newScheme);
      colorScheme.set(newScheme);
    } catch (error) {
      console.error("Error setting color scheme:", error);
      crashlytics.recordError(error as Error);
    }
  };

  // Initialize Firebase services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        await crashlytics.setCrashlyticsCollectionEnabled(true);
        await inAppMessaging.setMessagesDisplaySuppressed(true);
        await payment.initialize();

        if (isAuthenticated && auth().currentUser) {
          const user = auth().currentUser;
          await payment.setAttributes({
            firebase_user_id: user?.uid || "",
          });
          if (user?.email) {
            await payment.setEmail(user.email);
          }
          if (user?.displayName) {
            await payment.setDisplayName(user.displayName);
          }
        }

        const unsubscribe = auth().onAuthStateChanged(async (user) => {
          setIsAuthenticated(!!user);
          setIsLoading(false);

          await crashlytics.setUserId(user?.uid || null);

          if (user) {
            const userProperties = {
              email: user.email || "anonymous",
              provider: user.providerData[0]?.providerId || "anonymous",
            };

            await crashlytics.setAttributes(userProperties);
            await analytics.setUserProperties(userProperties);

            const hasPermission = await messaging.requestUserPermission();
            if (hasPermission) {
              const token = await messaging.getFCMToken();
              if (token) {
                await payment.setPushToken(token);
              }
            }
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error initializing services:", error);
      }
    };

    initializeServices();
  }, [isAuthenticated]);

  // Handle language changes
  useEffect(() => {
    const setFirebaseLanguage = async () => {
      try {
        await auth().setLanguageCode(language);
        await crashlytics.setAttribute("user_language", language);
        await analytics.setUserProperties({ user_language: language });
      } catch (error) {
        console.error("Error setting Firebase language:", error);
        crashlytics.recordError(error as Error);
      }
    };

    setFirebaseLanguage();
  }, [language]);

  const value: AppContextType = {
    isAuthenticated,
    setIsAuthenticated,
    language,
    setLanguage,
    isLoading,
    hasSeenOnboarding,
    colorScheme: userColorScheme,
    setColorScheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};