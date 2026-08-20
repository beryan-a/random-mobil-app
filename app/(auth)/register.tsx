import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import auth from "@/services/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAuthSchemas } from "@/schemas/authSchemas";
import { Ionicons } from "@expo/vector-icons";
import WebView from "@/components/common/WebView";
import { handleFirebaseError } from "@/services/error-handling";
import { Toast } from "toastify-react-native";
import i18n from "@/services/i18n";
import { colorScheme } from "nativewind";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  const { setIsAuthenticated } = useAppContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isDark = colorScheme.get() === "dark";
  const { registerSchema } = createAuthSchemas();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const displayName = `${data.firstName} ${data.lastName}`;
    const { success, error } = await auth.registerWithEmail(
      data.email,
      data.password,
      displayName
    );
    if (success) {
      setIsAuthenticated(true);
      Toast.success(i18n.t("registerScreen.registerSuccess"));
      router.replace("/(app)/home");
    } else {
      const errorMessage = handleFirebaseError(error);
      Toast.error(errorMessage);
    }
  };

  const [webViewVisible, setWebViewVisible] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");
  const [webViewTitle, setWebViewTitle] = useState("");

  const openWebView = (url: string, title: string) => {
    setWebViewUrl(url);
    setWebViewTitle(title);
    setWebViewVisible(true);
  };

  const termsUrl = process.env.EXPO_PUBLIC_TERMS_OF_USE_URL || "";
  const privacyUrl = process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL || "";
  const companyName = process.env.EXPO_PUBLIC_COMPANY_NAME || "Company";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <ScrollView className="flex-1 px-6 mt-8">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full mb-4">
              <Text className="mb-2 text-gray-700 dark:text-white">
                {i18n.t("registerScreen.firstNameLabel")}
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base text-gray-800 dark:text-white ${
                  errors.firstName ? "border-red-500" : "border-gray-200"
                }`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={i18n.t("registerScreen.firstNamePlaceholder")}
                autoCorrect={false}
              />
              {errors.firstName && (
                <Text className="mt-1 text-xs text-red-500 dark:text-white">
                  {errors.firstName.message}
                </Text>
              )}
            </View>
          )}
          name="firstName"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full mb-4">
              <Text className="mb-2 text-gray-700 dark:text-white">
                {i18n.t("registerScreen.lastNameLabel")}
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base text-gray-800 dark:text-white ${
                  errors.lastName ? "border-red-500" : "border-gray-200"
                }`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={i18n.t("registerScreen.lastNamePlaceholder")}
                autoCorrect={false}
              />
              {errors.lastName && (
                <Text className="mt-1 text-xs text-red-500 dark:text-white">
                  {errors.lastName.message}
                </Text>
              )}
            </View>
          )}
          name="lastName"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full mb-4">
              <Text className="mb-2 text-gray-700 dark:text-white">
                {i18n.t("registerScreen.emailLabel")}
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base text-gray-800 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={i18n.t("registerScreen.emailPlaceholder")}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text className="mt-1 text-xs text-red-500 dark:text-white">
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full mb-4">
              <Text className="mb-2 text-gray-700 dark:text-white">
                {i18n.t("registerScreen.passwordLabel")}
              </Text>
              <View className="relative">
                <TextInput
                  className={`border rounded-xl px-4 py-3 pr-10 text-base text-gray-800 dark:text-white ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={i18n.t("registerScreen.passwordPlaceholder")}
                  secureTextEntry={!isPasswordVisible}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={isDark ? "#fff" : "#4B5563"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="mt-1 text-xs text-red-500 dark:text-white">
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
          name="password"
        />

        <TouchableOpacity
          className="bg-brand dark:bg-white/90 w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-base dark:text-black">
            {i18n.t("registerScreen.registerButton")}
          </Text>
        </TouchableOpacity>

        <View className="flex-row my-4 justify-center">
          <Text className="text-gray-600 dark:text-white">
            {i18n.t("registerScreen.loginPrompt")}{" "}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="font-semibold text-brand dark:text-white">
              {i18n.t("registerScreen.loginLink")}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-sm text-gray-600 dark:text-white mt-4">
          {i18n.t("registerScreen.signUpAgreement", { companyName })}{" "}
          <TouchableOpacity
            onPress={() =>
              openWebView(termsUrl, i18n.t("registerScreen.termsLink"))
            }
          >
            <Text className="text-brand underline text-sm -mb-[5] dark:text-white">
              {i18n.t("registerScreen.termsLink")}
            </Text>
          </TouchableOpacity>{" "}
          {i18n.t("common.and")}{" "}
          <TouchableOpacity
            onPress={() =>
              openWebView(privacyUrl, i18n.t("registerScreen.privacyLink"))
            }
          >
            <Text className="text-brand underline text-sm -mb-[5] dark:text-white">
              {i18n.t("registerScreen.privacyLink")}
            </Text>
          </TouchableOpacity>{" "}
          {i18n.t("registerScreen.emailConsent", { companyName })}
        </Text>

        <WebView
          url={webViewUrl}
          title={webViewTitle}
          isVisible={webViewVisible}
          onClose={() => setWebViewVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
