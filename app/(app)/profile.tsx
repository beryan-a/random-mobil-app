import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { SelectionBottomSheet } from "@/components/common/SelectionBottomSheet";
import { router } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import auth from "@/services/auth";
import firebaseAuth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import authProviders from "@/services/auth/providers";
import { AUTH_PROVIDERS, SUPPORTED_LANGUAGES } from "@/constants";
import { Toast } from "toastify-react-native";
import i18n from "@/services/i18n";
import { useColorScheme } from "nativewind";

export default function Profile() {
  const {
    setLanguage,
    language: currentLanguage,
    setColorScheme: setAppColorScheme,
  } = useAppContext();
  const [providers, setProviders] = useState<string[]>([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const user = firebaseAuth().currentUser;

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    setProviders(auth.getProviders());
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.locale = langCode;
    setLanguage(langCode);
    setShowLanguageModal(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      i18n.t("profileScreen.logoutConfirmTitle"),
      i18n.t("profileScreen.logoutConfirmMessage"),
      [
        {
          text: i18n.t("common.cancel"),
          style: "cancel",
        },
        {
          text: i18n.t("common.ok"),
          onPress: async () => {
            try {
              await auth.logout();
              // Toast.success(i18n.t("profileScreen.logoutSuccess"));
              router.replace("/(auth)/login");
            } catch (error) {
              Toast.error(i18n.t("profileScreen.logoutError"));
            }
          },
        },
      ]
    );
  };

  const renderUserInfo = () => {
    if (!user) return null;

    if (user.isAnonymous) {
      return (
        <View className="flex-row items-center mb-5">
          <Ionicons
            name="person-outline"
            size={20}
            color={isDark ? "#fff" : "#000"}
          />
          <Text className="text-base ml-2 text-gray-600 dark:text-white">
            {i18n.t("profileScreen.anonymousUser")}
          </Text>
        </View>
      );
    }

    const userProviders = user.providerData.map(
      (provider) => provider.providerId
    );

    return (
      <>
        {user.displayName && (
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="person-outline"
              size={20}
              color={isDark ? "#fff" : "#4B5563"}
            />
            <Text className="text-base ml-2 text-gray-600 dark:text-white">
              {i18n.t("profileScreen.displayName")}: {user.displayName}
            </Text>
          </View>
        )}
        <View className="flex-row items-center mb-2">
          <Ionicons
            name="mail-outline"
            size={20}
            color={isDark ? "#fff" : "#4B5563"}
          />
          <Text className="text-base ml-2 text-gray-600 dark:text-white">
            {i18n.t("profileScreen.email")}: {user.email}
          </Text>
        </View>
        <View className="flex-row items-center mb-5">
          <Ionicons
            name="finger-print-outline"
            size={20}
            color={isDark ? "#fff" : "#4B5563"}
          />
          <Text className="text-base ml-2 text-gray-600 dark:text-white">
            {i18n.t("profileScreen.userId")}: {user.uid}
          </Text>
        </View>

        {userProviders.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">
              {i18n.t("profileScreen.linkedAccounts")}
            </Text>
            {userProviders.map((provider) => (
              <View
                key={provider}
                className="flex-row items-center mb-2 bg-gray-100 rounded-full py-2 px-4 dark:bg-slate-800"
              >
                <Ionicons
                  name={authProviders.getProviderIcon(provider)}
                  size={20}
                  color={isDark ? "#fff" : "#4B5563"}
                  style={{ marginRight: 8 }}
                />
                <Text className="text-base text-gray-700">
                  {authProviders.getProviderDisplayName(provider)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </>
    );
  };

  const handleLinkGoogle = async () => {
    const { success } = await auth.loginWithGoogle();
    if (success) {
      Toast.success(i18n.t("profileScreen.googleLinkSuccess"));
      setProviders(auth.getProviders());
    } else {
      Toast.error(i18n.t("profileScreen.googleLinkError"));
    }
  };

  const handleUnlinkGoogle = async () => {
    const { success } = await auth.unlinkGoogle();
    if (success) {
      Toast.success(i18n.t("profileScreen.googleUnlinkSuccess"));
      setProviders(auth.getProviders());
    } else {
      Toast.error(i18n.t("profileScreen.googleUnlinkError"));
    }
  };

  const handleLinkApple = async () => {
    const { success } = await auth.loginWithApple();
    if (success) {
      Toast.success(i18n.t("profileScreen.appleLinkSuccess"));
      setProviders(auth.getProviders());
    } else {
      Toast.error(i18n.t("profileScreen.appleLinkError"));
    }
  };

  const handleUnlinkApple = async () => {
    const { success } = await auth.unlinkApple();
    if (success) {
      Toast.success(i18n.t("profileScreen.appleUnlinkSuccess"));
      setProviders(auth.getProviders());
    } else {
      Toast.error(i18n.t("profileScreen.appleUnlinkError"));
    }
  };

  const getCurrentLanguageName = () => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);
    return lang ? `${lang.flag} ${lang.name}` : "English";
  };

  const getThemeDisplayName = (theme: "light" | "dark" | "system") => {
    switch (theme) {
      case "light":
        return i18n.t("profileScreen.lightMode");
      case "dark":
        return i18n.t("profileScreen.darkMode");
      case "system":
        return i18n.t("profileScreen.systemModeWithValue", {
          mode:
            colorScheme === "dark"
              ? i18n.t("profileScreen.darkMode")
              : i18n.t("profileScreen.lightMode"),
        });
    }
  };

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setAppColorScheme(theme);
    setShowThemeModal(false);
  };

  const renderLanguageSelector = () => (
    <View className="w-full mb-5 mt-4">
      <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">
        {i18n.t("profileScreen.languageSelection")}
      </Text>
      <TouchableOpacity
        className="flex-row items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-slate-800"
        onPress={() => setShowLanguageModal(true)}
      >
        <Text className="text-base text-gray-700 dark:text-white">
          {getCurrentLanguageName()}
        </Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={isDark ? "#fff" : "#4B5563"}
        />
      </TouchableOpacity>

      <SelectionBottomSheet
        isVisible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title={i18n.t("profileScreen.languageSelection") || "Select Language"}
        height="70%"
        selectedValue={currentLanguage}
        options={SUPPORTED_LANGUAGES.map((lang) => ({
          id: lang.code,
          value: lang.code,
          label: `${lang.flag}  ${lang.name}`,
        }))}
        onSelect={(option) => changeLanguage(option.value as string)}
      />
    </View>
  );

  const renderThemeSelector = () => (
    <View className="w-full mb-5">
      <Text className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">
        {i18n.t("profileScreen.theme")}
      </Text>
      <TouchableOpacity
        className="flex-row items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-slate-800"
        onPress={() => setShowThemeModal(true)}
      >
        <Text className="text-base text-gray-700 dark:text-white">
          {getThemeDisplayName(colorScheme || "system")}
        </Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={isDark ? "#fff" : "#4B5563"}
        />
      </TouchableOpacity>

      <SelectionBottomSheet
        isVisible={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title={i18n.t("profileScreen.themeSelection")}
        height="40%"
        selectedValue={colorScheme}
        options={[
          {
            id: "light",
            value: "light",
            label: getThemeDisplayName("light"),
            icon: "sunny-outline",
          },
          {
            id: "dark",
            value: "dark",
            label: getThemeDisplayName("dark"),
            icon: "moon-outline",
          },
          {
            id: "system",
            value: "system",
            label: getThemeDisplayName("system"),
            icon: "phone-portrait-outline",
          },
        ]}
        onSelect={(option) =>
          handleThemeChange(option.value as "light" | "dark" | "system")
        }
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <View className="flex-1 px-6 mt-7">
        <FlatList
          data={[{ key: "content" }]}
          renderItem={() => (
            <>
              <View className="bg-slate-200 p-3 rounded-lg mb-4 dark:bg-slate-800">
                {renderUserInfo()}
              </View>

              {!providers.includes(AUTH_PROVIDERS.GOOGLE) && (
                <TouchableOpacity
                  className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
                  onPress={handleLinkGoogle}
                >
                  <Ionicons
                    name="logo-google"
                    size={20}
                    color={isDark ? "#fff" : "#000"}
                  />
                  <Text className="text-black text-base ml-2 dark:text-white">
                    {i18n.t("profileScreen.linkGoogle")}
                  </Text>
                </TouchableOpacity>
              )}

              {providers.includes(AUTH_PROVIDERS.GOOGLE) && (
                <TouchableOpacity
                  className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
                  onPress={handleUnlinkGoogle}
                >
                  <Ionicons
                    name="unlink-outline"
                    size={20}
                    color={isDark ? "#fff" : "#000"}
                  />
                  <Text className="text-black text-base ml-2 dark:text-white">
                    {i18n.t("profileScreen.unlinkGoogle")}
                  </Text>
                </TouchableOpacity>
              )}

              {Platform.OS === "ios" &&
                !providers.includes(AUTH_PROVIDERS.APPLE) && (
                  <TouchableOpacity
                    className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
                    onPress={handleLinkApple}
                  >
                    <Ionicons
                      name="logo-apple"
                      size={20}
                      color={isDark ? "#fff" : "#000"}
                    />
                    <Text className="text-black text-base ml-2 dark:text-white">
                      {i18n.t("profileScreen.linkApple")}
                    </Text>
                  </TouchableOpacity>
                )}

              {Platform.OS === "ios" &&
                providers.includes(AUTH_PROVIDERS.APPLE) && (
                  <TouchableOpacity
                    className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
                    onPress={handleUnlinkApple}
                  >
                    <Ionicons
                      name="unlink-outline"
                      size={20}
                      color={isDark ? "#fff" : "#000"}
                    />
                    <Text className="text-black text-base ml-2 dark:text-white">
                      {i18n.t("profileScreen.unlinkApple")}
                    </Text>
                  </TouchableOpacity>
                )}

              {renderLanguageSelector()}
              {renderThemeSelector()}

              <TouchableOpacity
                className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row bg-red-500 dark:bg-red-600"
                onPress={handleLogout}
              >
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={isDark ? "#fff" : "#000"}
                />
                <Text className="text-white text-base ml-2">
                  {i18n.t("profileScreen.logoutButton")}
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
