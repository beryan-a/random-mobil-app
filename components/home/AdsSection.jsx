import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ads, { BannerAd, BannerAdSize } from "@/services/ads";

export const AdsSection = () => {
  const handleShowInterstitial = async () => {
    const success = await ads.showInterstitial();
    if (success) {
      console.log("Interstitial ad was shown successfully");
    } else {
      console.log("Failed to show interstitial ad");
    }
  };

  const handleShowRewarded = async () => {
    const { success, reward } = await ads.showRewarded();
    if (success && reward) {
      console.log(`User earned reward: ${reward.amount} ${reward.type}`);
      // Handle reward here (e.g., give user coins, points, etc.)
    } else {
      console.log(
        "Failed to show rewarded ad or user didn't complete watching"
      );
    }
  };

  return (
    <View className="mb-6 rounded-xl p-4 shadow-md dark:bg-slate-800">
      <Text className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
        Test Ads
      </Text>
      <View className="flex-row" style={{ gap: 16 }}>
        <TouchableOpacity
          className="flex-1 bg-black dark:bg-slate-700 py-3 px-4 rounded-xl items-center"
          onPress={handleShowInterstitial}
        >
          <Text className="text-white font-semibold text-xs">
            Show Interstitial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-black dark:bg-slate-700 py-3 px-4 rounded-xl items-center"
          onPress={handleShowRewarded}
        >
          <Text className="text-white font-semibold text-xs">
            Watch Rewarded Ad
          </Text>
        </TouchableOpacity>
      </View>
      {/* Banner Ad */}
      <View className="mt-4">
        <BannerAd
          unitId={ads.getBannerAdUnitId()}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
};
