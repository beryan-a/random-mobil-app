import appsFlyer, { InitSDKOptions } from "react-native-appsflyer";
import { Platform } from "react-native";

/**
 * Initialize the AppsFlyer SDK
 */
export const initialize = async (): Promise<any> => {
  try {
    const options: InitSDKOptions = {
      devKey: process.env.EXPO_PUBLIC_APPSFLYER_DEV_KEY || "",
      appId: process.env.EXPO_PUBLIC_APPSFLYER_APPLE_ID || "", // (iOS only) you configured in your AppsFlyer dashboard
      isDebug: __DEV__, // Enable debug mode in development
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      timeToWaitForATTUserAuthorization: 10, // for iOS 14.5+
    };

    return new Promise((resolve, reject) => {
      appsFlyer.initSdk(
        options,
        (result) => {
          console.log("AppsFlyer initialized successfully:", result);
          resolve(result);
        },
        (error) => {
          console.error("AppsFlyer initialization failed:", error);
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error("Error initializing AppsFlyer:", error);
    throw error;
  }
};

/**
 * Update the token for uninstall tracking (Android only)
 */
export const updateUninstallToken = async (token: string): Promise<boolean> => {
  try {
    // Only use this method for Android as iOS uses native implementation
    if (Platform.OS !== "android") {
      return true;
    }

    return new Promise((resolve, reject) => {
      appsFlyer.updateServerUninstallToken(token, (success) => {
        if (success) {
          console.log("Uninstall token updated successfully");
          resolve(true);
        } else {
          console.error("Failed to update uninstall token");
          reject(new Error("Failed to update uninstall token"));
        }
      });
    });
  } catch (error) {
    console.error("Error updating uninstall token:", error);
    throw error;
  }
};

/**
 * Log an event to AppsFlyer
 */
export const logEvent = async (
  eventName: string, 
  eventValues?: Record<string, any>
): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      appsFlyer.logEvent(
        eventName,
        eventValues || {},
        (result) => {
          console.log("Event logged successfully:", eventName, result);
          resolve(result);
        },
        (error) => {
          console.error("Error logging event:", eventName, error);
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error("Error in logEvent:", error);
    throw error;
  }
};

/**
 * Register a callback for deep link data
 */
export const onDeepLink = (callback: (result: any) => void): void => {
  appsFlyer.onDeepLink(callback);
};

/**
 * Register a callback for install conversion data
 */
export const onInstallConversionData = (callback: (data: any) => void): void => {
  appsFlyer.onInstallConversionData(callback);
};

/**
 * Get AppsFlyer unique ID
 */
export const getAppsFlyerUID = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    appsFlyer.getAppsFlyerUID((uid) => {
      resolve(uid);
    });
  });
};

/**
 * Stop tracking (for GDPR compliance)
 */
export const stop = async (shouldStop: boolean = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    appsFlyer.stop(shouldStop, (res) => {
      if (res === 'Success') {
        resolve();
      } else {
        reject(new Error(`Failed to stop AppsFlyer: ${res}`));
      }
    });
  });
};

export default {
  initialize,
  updateUninstallToken,
  logEvent,
  onDeepLink,
  onInstallConversionData,
  getAppsFlyerUID,
  stop
};