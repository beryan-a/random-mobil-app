import messaging from '@react-native-firebase/messaging';
import { Platform } from "react-native";
import crashlytics from "../error-handling/crashlytics";

/**
 * Request notification permissions from the user
 */
export const requestUserPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === "ios") {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      return enabled;
    }

    // For Android API level 33+
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const { PermissionsAndroid } = require("react-native");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  } catch (error) {
    crashlytics.recordError(error as Error);
    return false;
  }
};

/**
 * Get the device FCM token
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    crashlytics.recordError(error as Error);
    return null;
  }
};

/**
 * Register a callback for foreground messages
 */
export const onMessage = (callback: (message: any) => void): () => void => {
  return messaging().onMessage(callback);
};

/**
 * Register a callback for when a notification is tapped in the background
 */
export const onNotificationOpenedApp = (callback: (message: any) => void): () => void => {
  return messaging().onNotificationOpenedApp(callback);
};

/**
 * Get the notification that opened the app (if any)
 */
export const getInitialNotification = async (): Promise<any | null> => {
  try {
    return await messaging().getInitialNotification();
  } catch (error) {
    crashlytics.recordError(error as Error);
    return null;
  }
};

/**
 * Subscribe to a topic
 */
export const subscribeToTopic = async (topic: string): Promise<void> => {
  try {
    await messaging().subscribeToTopic(topic);
  } catch (error) {
    crashlytics.recordError(error as Error);
  }
};

/**
 * Unsubscribe from a topic
 */
export const unsubscribeFromTopic = async (topic: string): Promise<void> => {
  try {
    await messaging().unsubscribeFromTopic(topic);
  } catch (error) {
    crashlytics.recordError(error as Error);
  }
};

export default {
  requestUserPermission,
  getFCMToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  subscribeToTopic,
  unsubscribeFromTopic
};