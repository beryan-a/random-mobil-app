import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import i18n from '@/services/i18n';
import { colorScheme } from "nativewind";

type QuickActionButton = {
  icon: "person-outline" | "chatbubble-ellipses-outline" | "game-controller-outline" | "cloudy-night-outline";
  label: string;
  onPress: () => void;
};

export const QuickActions = () => {
  const isDark = colorScheme.get() === "dark";

  const quickActions: QuickActionButton[] = [
    {
      icon: "person-outline",
      label: i18n.t("homeScreen.profile"),
      onPress: () => router.push("/(app)/profile"),
    },
    {
      icon: "chatbubble-ellipses-outline",
      label: i18n.t("homeScreen.chat"),
      onPress: () => router.push("/(app)/chat"),
    },
    {
      icon: "game-controller-outline",
      label: "Tetris",
      onPress: () => router.push("/(app)/Tetris"),
    },
    {
      icon: "cloudy-night-outline",
      label: "Check Weather",
      onPress: () => router.push("/(app)/Weather"),
    },
  ];

  return (
    <>
      <Text className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
        {i18n.t("homeScreen.quickActions")}
      </Text>

      <ScrollView alwaysBounceHorizontal={true}>

        <View style={{ gap: 30 }} className="flex-row justify-between">
          {quickActions.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={button.onPress}
              className="flex-1 items-center bg-slate-200 p-4 rounded-xl shadow-md dark:bg-slate-800"
            >
              <Ionicons
                name={button.icon}
                size={30}
                color={isDark ? "#9CA3AF" : "#4B5563"}
              />
              <Text className="mt-2 text-sm text-gray-600 text-center dark:text-white font-regular">
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
        
    </>
  );
};
