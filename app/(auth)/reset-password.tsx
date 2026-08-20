import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import auth from '@/services/auth';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAuthSchemas } from "@/schemas/authSchemas";
import { handleFirebaseError } from "@/services/error-handling";
import { Toast } from "toastify-react-native";
import i18n from '@/services/i18n';
import { useColorScheme } from "nativewind";

type ResetPasswordFormData = {
  email: string;
};

export default function ResetPassword() {
  const { resetPasswordSchema } = createAuthSchemas();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const { success, error } = await auth.sendPasswordResetEmail(
        data.email
      );
      if (success) {
        Toast.success(i18n.t("resetPasswordScreen.emailSent"));
        router.back();
      } else {
        const errorMessage = handleFirebaseError(error);
        Toast.error(errorMessage);
      }
    } catch (error) {
      Toast.error(i18n.t("resetPasswordScreen.sendError"));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <View className="flex-1 px-6 mt-10">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full mb-4">
              <Text className="mb-2 text-gray-700 dark:text-white">
                {i18n.t("resetPasswordScreen.emailLabel")}
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base text-gray-800 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={i18n.t("resetPasswordScreen.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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

        <TouchableOpacity
          className="bg-black dark:bg-white/90 w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-base dark:text-black">
            {i18n.t("resetPasswordScreen.sendButton")}
          </Text>
        </TouchableOpacity>

        <View className="flex-row my-4 justify-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="font-semibold text-brand dark:text-white">
              {i18n.t("resetPasswordScreen.backToLogin")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
