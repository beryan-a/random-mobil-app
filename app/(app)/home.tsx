import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import i18n from '@/services/i18n';
import { QuickActions } from "@/components/home/QuickActions";
import { AdsSection } from "@/components/home/AdsSection";
import { PremiumSection } from "@/components/home/PremiumSection";
import { UserInfo } from "@/components/home/UserInfo";

export default function Home() {
  const user = auth().currentUser;


  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-3xl font-semibold text-gray-800 mb-2 dark:text-white">
            {i18n.t("homeScreen.welcome")}
            {user?.displayName ? `, ${user.displayName}` : ""}
          </Text>
          <Text className="text-lg font-medium text-gray-600 mb-6 dark:text-white">
            {i18n.t("homeScreen.subtitle")}
          </Text>

          <QuickActions />
          <AdsSection />
          <PremiumSection />
          <UserInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});