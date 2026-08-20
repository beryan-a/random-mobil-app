import crashlyticsModule from '@react-native-firebase/crashlytics';

/**
 * Set the user ID for Crashlytics
 */
export const setUserId = async (userId: string | null): Promise<void> => {
  try {
    await crashlyticsModule().setUserId(userId || "");
  } catch (error) {
    console.error("Error setting Crashlytics user ID:", error);
  }
};

/**
 * Set a single attribute for Crashlytics
 */
export const setAttribute = async (name: string, value: string): Promise<void> => {
  try {
    await crashlyticsModule().setAttribute(name, value);
  } catch (error) {
    console.error("Error setting Crashlytics attribute:", error);
  }
};

/**
 * Set multiple attributes for Crashlytics
 */
export const setAttributes = async (attributes: Record<string, string>): Promise<void> => {
  try {
    await crashlyticsModule().setAttributes(attributes);
  } catch (error) {
    console.error("Error setting Crashlytics attributes:", error);
  }
};

/**
 * Add a log message that will be sent with the next crash report
 */
export const log = (message: string): void => {
  try {
    crashlyticsModule().log(message);
  } catch (error) {
    console.error("Error logging to Crashlytics:", error);
  }
};

/**
 * Record a non-fatal error in Crashlytics
 */
export const recordError = (error: Error, jsErrorName?: string): void => {
  try {
    crashlyticsModule().recordError(error, jsErrorName);
  } catch (crashError) {
    console.error("Error recording error to Crashlytics:", crashError);
  }
};

/**
 * Enable or disable Crashlytics data collection
 */
export const setCrashlyticsCollectionEnabled = async (enabled: boolean): Promise<void> => {
  try {
    await crashlyticsModule().setCrashlyticsCollectionEnabled(enabled);
  } catch (error) {
    console.error("Error setting Crashlytics collection:", error);
  }
};

/**
 * Record a JavaScript exception
 */
export const recordException = (exception: Error): void => {
  try {
    crashlyticsModule().recordError(exception);
  } catch (error) {
    console.error("Error recording exception to Crashlytics:", error);
  }
};

export default {
  setUserId,
  setAttribute,
  setAttributes,
  log,
  recordError,
  setCrashlyticsCollectionEnabled,
  recordException
};