import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import auth from "@/services/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAuthSchemas } from "@/schemas/authSchemas";
import { Ionicons } from "@expo/vector-icons";
import { handleFirebaseError } from "@/services/error-handling";
import { Toast } from "toastify-react-native";
import i18n from "@/services/i18n";
import { colorScheme } from "nativewind";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { setIsAuthenticated } = useAppContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isDark = colorScheme.get() === "dark";

  const { loginSchema } = createAuthSchemas();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { success, error } = await auth.loginWithEmail(
        data.email,
        data.password
      );
      if (success) {
        Toast.success("Login successful!");
        setIsAuthenticated(true);
        router.replace("/(app)/home");
      } else {
        const errorMessage = handleFirebaseError(error);
        Toast.error(errorMessage);
      }
    } catch (error) {
      Toast.error("An error occurred");
    }
  };

  const handleAnonymousLogin = async () => {
    const { success, error } = await auth.loginAnonymously();
    if (success) {
      setIsAuthenticated(true);
      // Toast.success(i18n.t("loginScreen.anonymousLoginSuccess"));
      router.replace("/(app)/home");
    } else {
      const errorMessage = handleFirebaseError(error);
      Toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { success, error } = await auth.loginWithGoogle();
      if (success) {
        setIsAuthenticated(true);
        Toast.success(i18n.t("loginScreen.googleLoginSuccess"));
        router.replace("/(app)/home");
      } else {
        const errorMessage = handleFirebaseError(error);
        Toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Toast.error(i18n.t("loginScreen.googleLoginError"));
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { success, error } = await auth.loginWithApple();
      if (success) {
        setIsAuthenticated(true);
        Toast.success(i18n.t("loginScreen.appleLoginSuccess"));
        router.replace("/(app)/home");
      } else {
        const errorMessage = handleFirebaseError(error);
        Toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      Toast.error(i18n.t("loginScreen.appleLoginError"));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700 ">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          {i18n.t("loginScreen.title")}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full mb-4">
              <Text className="mb-2 text-gray-700 dark:text-white">
                {i18n.t("loginScreen.emailLabel")}
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base text-gray-800 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={i18n.t("loginScreen.emailPlaceholder")}
                autoCorrect={false}
                autoCapitalize="none"
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
              <Text className="mb-2 text-gray-700">
                {i18n.t("loginScreen.passwordLabel")}
              </Text>
              <View className="relative">
                <TextInput
                  className={`border rounded-xl px-4 py-3 pr-10 text-base text-gray-800 dark:text-white ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={i18n.t("loginScreen.passwordPlaceholder")}
                  secureTextEntry={!isPasswordVisible}
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
          className="mb-4"
          onPress={() => router.push("/reset-password")}
        >
          <Text className="text-right text-brand dark:text-white">
            {i18n.t("loginScreen.forgotPassword")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-black dark:bg-white/90 w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-base dark:text-black">
            {i18n.t("loginScreen.loginButton")}
          </Text>
        </TouchableOpacity>
        <View className="flex-row my-4 justify-center">
          <Text className="text-gray-600 dark:text-white">
            {i18n.t("loginScreen.registerPrompt")}{" "}
          </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text className="font-semibold text-brand dark:text-white">
                {i18n.t("loginScreen.registerLink")}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <TouchableOpacity
          className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
          onPress={handleAnonymousLogin}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={isDark ? "#fff" : "#000"}
          />
          <Text className="text-black text-base ml-2 dark:text-white">
            {i18n.t("loginScreen.anonymousLoginButton")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
          onPress={() => router.push("/phone-login")}
        >
          <Ionicons
            name="call-outline"
            size={20}
            color={isDark ? "#fff" : "#000"}
          />
          <Text className="text-black text-base ml-2 dark:text-white">
            {i18n.t("loginScreen.phoneLoginButton")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
          onPress={handleGoogleLogin}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color={isDark ? "#fff" : "#000"}
          />
          <Text className="text-black text-base ml-2 dark:text-white">
            {i18n.t("loginScreen.googleLoginButton")}
          </Text>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <TouchableOpacity
            className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border-gray-200 border dark:border-white"
            onPress={handleAppleLogin}
          >
            <Ionicons
              name="logo-apple"
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
            <Text className="text-black text-base ml-2 dark:text-white">
              {i18n.t("loginScreen.appleLoginButton")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
