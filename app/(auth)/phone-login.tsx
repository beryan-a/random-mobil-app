import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  I18nManager,
} from "react-native";
import { router } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import auth from '@/services/auth';
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import i18n from '@/services/i18n';
import PhoneInput, {
  ICountry,
  ILanguage,
} from "react-native-international-phone-number";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAuthSchemas } from "@/schemas/authSchemas";
import { handleFirebaseError } from "@/services/error-handling";
import { getLocales } from "expo-localization";
import { colorScheme } from "nativewind";

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirm, setConfirm] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const { setIsAuthenticated } = useAppContext();
  const isDark = colorScheme.get() === "dark";
  const { phoneLoginSchema } = createAuthSchemas();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneLoginSchema),
  });

  const handleSendCode = async () => {
    try {
      if (!selectedCountry || !phoneNumber) {
        Toast.error(i18n.t("phoneLoginScreen.invalidPhoneNumber"));
        return;
      }
      const fullPhoneNumber = `${selectedCountry.callingCode}${phoneNumber}`;

      const { success, confirmation, error } =
        await auth.verifyPhoneNumber(fullPhoneNumber);

      if (success && confirmation) {
        setConfirm(confirmation);
        Toast.success(i18n.t("phoneLoginScreen.codeSent"));
      } else {
        const errorMessage = handleFirebaseError(error);
        Toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      Toast.error(i18n.t("phoneLoginScreen.sendCodeError"));
    }
  };

  const handleVerifyCode = async () => {
    try {
      const { success, error } = await auth.confirmPhoneNumber(
        confirm,
        confirmationCode
      );

      if (success) {
        setIsAuthenticated(true);
        Toast.success(i18n.t("phoneLoginScreen.loginSuccess"));
        router.replace("/(app)/home");
      } else {
        const errorMessage = handleFirebaseError(error);
        Toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      Toast.error(i18n.t("phoneLoginScreen.verificationError"));
    }
  };

  const renderPhoneInput = () => (
    <View className="w-full mb-4">
      <Text className="mb-2 text-gray-700 dark:text-white">
        {i18n.t("phoneLoginScreen.phoneLabel")}
      </Text>
      <PhoneInput
        value={phoneNumber}
        onChangePhoneNumber={setPhoneNumber}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={setSelectedCountry}
        defaultCountry="TR"
        language={getLocales()[0].languageCode as ILanguage}
        placeholder={i18n.t("phoneLoginScreen.phonePlaceholder")}
        popularCountries={["TR", "US", "GB", "DE"]}
        popularCountriesSectionTitle="Suggested"
        restOfCountriesSectionTitle="All"
        modalSearchInputPlaceholder={i18n.t(
          "phoneLoginScreen.searchPlaceholder"
        )}
        rtl={I18nManager.isRTL}
        theme={isDark ? "dark" : "light"}
      />
    </View>
  );

  const renderCodeInput = () => (
    <View className="w-full mb-4">
      <Text className="mb-2 text-gray-700 dark:text-white">
        {i18n.t("phoneLoginScreen.codeLabel")}
      </Text>
      <View className="relative">
        <TextInput
          className="border rounded-xl px-4 py-3 text-base text-gray-800 border-gray-200 dark:text-white"
          value={confirmationCode}
          onChangeText={setConfirmationCode}
          placeholder={i18n.t("phoneLoginScreen.codePlaceholder")}
          placeholderTextColor={isDark ? "#fff" : "#A0AEC0"}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <View className="flex-1 px-6 mt-10">
        {!confirm ? renderPhoneInput() : renderCodeInput()}
        <TouchableOpacity
          className="bg-black dark:bg-white/90 w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row"
          onPress={confirm ? handleVerifyCode : handleSendCode}
        >
          <Ionicons
            name={confirm ? "checkmark-circle-outline" : "send-outline"}
            size={20}
            color={isDark ? "#fff" : "#000"}
          />
          <Text className="text-white text-base ml-2 dark:text-black">
            {confirm
              ? i18n.t("phoneLoginScreen.verifyCodeButton")
              : i18n.t("phoneLoginScreen.sendCodeButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
