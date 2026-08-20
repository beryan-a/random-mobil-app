import React from "react";
import { Text, TouchableOpacity } from "react-native";
import i18n from '@/services/i18n';
import payment from '@/services/payment';

export const PremiumSection = () => {
  const handlePresentPaywall = async () => {
    const purchased = await payment.presentPaywall();
    if (purchased) {
      // User has successfully purchased or restored
      console.log("Purchase successful!");
    }
  };

  return (
    <>
      <Text className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
        {i18n.t("homeScreen.premiumSection")}
      </Text>

      <TouchableOpacity
        className="bg-brand w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row mb-6 dark:bg-slate-800"
        onPress={() => handlePresentPaywall()}
      >
        <Text className="text-white text-base font-regular">
          {i18n.t("homeScreen.openPaywall")}
        </Text>
      </TouchableOpacity>
    </>
  );
};
