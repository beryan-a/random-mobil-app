import analytics from '@react-native-firebase/analytics';

/**
 * Log an event to analytics
 */
export const logEvent = async (eventName: string, params?: Record<string, any>): Promise<void> => {
  try {
    await analytics().logEvent(eventName, params);
  } catch (error) {
    console.error(`Analytics log event error for ${eventName}:`, error);
  }
};

/**
 * Log a screen view
 */
export const logScreen = async (screenName: string, screenClass?: string): Promise<void> => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  } catch (error) {
    console.error(`Analytics log screen error for ${screenName}:`, error);
  }
};

/**
 * Set user properties
 */
export const setUserProperties = async (properties: Record<string, string>): Promise<void> => {
  try {
    await Promise.all(
      Object.entries(properties).map(([name, value]) =>
        analytics().setUserProperty(name, value)
      )
    );
  } catch (error) {
    console.error('Analytics set user properties error:', error);
  }
};

/**
 * Set user ID
 */
export const setUserId = async (userId: string | null): Promise<void> => {
  try {
    await analytics().setUserId(userId);
  } catch (error) {
    console.error('Analytics set user ID error:', error);
  }
};

/**
 * Log login event
 */
export const logLogin = async (method: string): Promise<void> => {
  try {
    await analytics().logLogin({ method });
  } catch (error) {
    console.error(`Analytics log login error for ${method}:`, error);
  }
};

/**
 * Log sign up event
 */
export const logSignUp = async (method: string): Promise<void> => {
  try {
    await analytics().logSignUp({ method });
  } catch (error) {
    console.error(`Analytics log sign up error for ${method}:`, error);
  }
};

/**
 * Log purchase event
 */
export const logPurchase = async (params: {
  currency: string;
  value: number;
  items: any[];
  transactionId?: string;
}): Promise<void> => {
  try {
    await analytics().logPurchase(params);
  } catch (error) {
    console.error('Analytics log purchase error:', error);
  }
};

/**
 * Log add to cart event
 */
export const logAddToCart = async (params: {
  items: any[];
  value?: number;
  currency?: string;
}): Promise<void> => {
  try {
    await analytics().logAddToCart(params);
  } catch (error) {
    console.error('Analytics log add to cart error:', error);
  }
};

/**
 * Enable analytics collection
 */
export const enableCollection = async (enabled: boolean): Promise<void> => {
  try {
    await analytics().setAnalyticsCollectionEnabled(enabled);
  } catch (error) {
    console.error(`Analytics set collection enabled (${enabled}) error:`, error);
  }
};

// Default export with all functions
export default {
  logEvent,
  logScreen,
  setUserProperties,
  setUserId,
  logLogin,
  logSignUp,
  logPurchase,
  logAddToCart,
  enableCollection
};