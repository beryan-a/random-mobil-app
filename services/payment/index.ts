import { Platform } from "react-native";
import Purchases, { LOG_LEVEL, CustomerInfo, PurchasesPackage } from "react-native-purchases";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

/**
 * Initialize RevenueCat with API keys
 */
export const initialize = async (): Promise<void> => {
  try {
    if (__DEV__) {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }

    const apiKey = Platform.select({
      ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
      android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
      default: "",
    });

    if (!apiKey) {
      throw new Error("RevenueCat API key not found");
    }

    await Purchases.configure({ apiKey });
    console.log("RevenueCat initialized successfully");
  } catch (error) {
    console.error("Error initializing RevenueCat:", error);
  }
};

/**
 * Log in user to RevenueCat
 */
export const login = async (userId: string): Promise<CustomerInfo | null> => {
  try {
    const { customerInfo } = await Purchases.logIn(userId);
    return customerInfo;
  } catch (error) {
    console.error("Error logging in to RevenueCat:", error);
    return null;
  }
};

/**
 * Log out user from RevenueCat
 */
export const logout = async (): Promise<void> => {
  try {
    await Purchases.logOut();
  } catch (error) {
    console.error("Error logging out from RevenueCat:", error);
  }
};

/**
 * Set user attributes in RevenueCat
 */
export const setAttributes = async (attributes: Record<string, string>): Promise<void> => {
  try {
    await Purchases.setAttributes(attributes);
  } catch (error) {
    console.error("Error setting RevenueCat attributes:", error);
  }
};

/**
 * Set user email in RevenueCat
 */
export const setEmail = async (email: string): Promise<void> => {
  try {
    await Purchases.setEmail(email);
  } catch (error) {
    console.error("Error setting RevenueCat email:", error);
  }
};

/**
 * Set user display name in RevenueCat
 */
export const setDisplayName = async (name: string): Promise<void> => {
  try {
    await Purchases.setDisplayName(name);
  } catch (error) {
    console.error("Error setting RevenueCat display name:", error);
  }
};

/**
 * Check if user has active entitlements
 */
export const checkEntitlements = async (entitlementId?: string): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    const activeEntitlementId = entitlementId || process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID!;
    
    return customerInfo.entitlements.active[activeEntitlementId]?.isActive ?? false;
  } catch (error) {
    console.error("Error checking entitlements:", error);
    return false;
  }
};

/**
 * Set push token for RevenueCat
 */
export const setPushToken = async (token: string): Promise<void> => {
  try {
    await Purchases.setPushToken(token);
  } catch (error) {
    console.error("Error setting push token:", error);
  }
};

/**
 * Present paywall to user
 */
export const presentPaywall = async (offering?: any): Promise<boolean> => {
  try {
    const paywallResult = await RevenueCatUI.presentPaywall({
      offering,
    });

    return paywallResult === PAYWALL_RESULT.PURCHASED || 
           paywallResult === PAYWALL_RESULT.RESTORED;
  } catch (error) {
    console.error("Error presenting paywall:", error);
    return false;
  }
};

/**
 * Present paywall if user doesn't have required entitlement
 */
export const presentPaywallIfNeeded = async (
  requiredEntitlementId: string
): Promise<boolean> => {
  try {
    const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: requiredEntitlementId,
    });

    return paywallResult === PAYWALL_RESULT.PURCHASED || 
           paywallResult === PAYWALL_RESULT.RESTORED;
  } catch (error) {
    console.error("Error presenting paywall:", error);
    return false;
  }
};

/**
 * Get available offerings from RevenueCat
 */
export const getOfferings = async () => {
  try {
    return await Purchases.getOfferings();
  } catch (error) {
    console.error("Error getting offerings:", error);
    return null;
  }
};

/**
 * Purchase a package
 */
export const purchasePackage = async (packageToPurchase: PurchasesPackage) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return customerInfo;
  } catch (error) {
    console.error("Error purchasing package:", error);
    return null;
  }
};

/**
 * Restore purchases
 */
export const restorePurchases = async () => {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error("Error restoring purchases:", error);
    return null;
  }
};

/**
 * Get customer info
 */
export const getCustomerInfo = async () => {
  try {
    return await Purchases.getCustomerInfo();
  } catch (error) {
    console.error("Error getting customer info:", error);
    return null;
  }
};

// Export everything as default
export default {
  initialize,
  login,
  logout,
  setAttributes,
  setEmail,
  setDisplayName,
  checkEntitlements,
  setPushToken,
  presentPaywall,
  presentPaywallIfNeeded,
  getOfferings,
  purchasePackage,
  restorePurchases,
  getCustomerInfo,
  PAYWALL_RESULT
};