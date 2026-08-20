import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import i18n from '@/services/i18n';
import { useColorScheme } from "nativewind";

export default function AuthLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2">
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: isDark ? "#0F172A" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: i18n.t("registerScreen.title"),
        }}
      />
      <Stack.Screen
        name="phone-login"
        options={{
          title: i18n.t("phoneLoginScreen.title"),
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          title: i18n.t("resetPasswordScreen.title"),
        }}
      />
    </Stack>
  );
}
