import React from "react";
import Onboarding from "react-native-onboarding-swiper";

import { Image, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import storage from '@/services/storage';
import i18n from '@/services/i18n';

const ONBOARDING_KEY = "has_seen_onboarding";

const OnboardingScreen = () => {
  const { width } = useWindowDimensions();
  const imageSize = width * 0.5;

  const handleDone = async () => {
    await storage.setItem(ONBOARDING_KEY, "true");
    router.replace("/(auth)/login");
  };

  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      bottomBarHighlight={true}
      // bottomBarColor="#F7F7F7"
      titleStyles={{
        fontFamily: "BricolageGrotesque-Bold",
        fontSize: 32,
        color: "#061257",
      }}
      subTitleStyles={{
        fontFamily: "BricolageGrotesque-Regular",
        fontSize: 16,
        color: "#49454F",
        marginBottom: 12,
      }}
      pages={[
        {
          backgroundColor: "#F5EFE7",
          image: (
            <View className="items-center justify-center">
              <Image
                source={require("@/assets/images/onboarding/screen-1.png")}
                style={{
                  width: imageSize,
                  height: imageSize,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
          title: i18n.t("onboarding.welcome.title"),
          subtitle: i18n.t("onboarding.welcome.subtitle"),
        },
        {
          backgroundColor: "#D8C4B6",
          image: (
            <View className="items-center justify-center">
              <Image
                source={require("@/assets/images/onboarding/screen-1.png")}
                style={{
                  width: imageSize,
                  height: imageSize,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
          title: i18n.t("onboarding.features.title"),
          subtitle: i18n.t("onboarding.features.subtitle"),
        },
        {
          backgroundColor: "#D9EAFD",
          image: (
            <View className="items-center justify-center">
              <Image
                source={require("@/assets/images/onboarding/screen-1.png")}
                style={{
                  width: imageSize,
                  height: imageSize,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
          title: i18n.t("onboarding.start.title"),
          subtitle: i18n.t("onboarding.start.subtitle"),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
