import { AUTH_PROVIDERS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

export const getProviderIcon = (
  providerName: string
): keyof typeof Ionicons.glyphMap => {
  switch (providerName) {
    case AUTH_PROVIDERS.GOOGLE:
      return "logo-google";
    case AUTH_PROVIDERS.APPLE:
      return "logo-apple";
    case AUTH_PROVIDERS.PHONE:
      return "call-outline";
    case AUTH_PROVIDERS.PASSWORD:
      return "mail-outline";
    default:
      return "person-outline";
  }
};

export const getProviderDisplayName = (providerName: string): string => {
  switch (providerName) {
    case AUTH_PROVIDERS.GOOGLE:
      return "Google";
    case AUTH_PROVIDERS.APPLE:
      return "Apple";
    case AUTH_PROVIDERS.PHONE:
      return "Phone";
    case AUTH_PROVIDERS.PASSWORD:
      return "Email";
    default:
      return providerName;
  }
};
