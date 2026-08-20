import inAppMessaging from '@react-native-firebase/in-app-messaging';
import crashlytics from "../error-handling/crashlytics";

/**
 * Set whether in-app messages should be suppressed or not
 */
export const setMessagesDisplaySuppressed = async (suppressed: boolean): Promise<void> => {
  try {
    await inAppMessaging().setMessagesDisplaySuppressed(suppressed);
  } catch (error) {
    crashlytics.recordError(error as Error);
  }
};

/**
 * Trigger an in-app messaging event
 */
export const triggerEvent = async (eventName: string): Promise<void> => {
  try {
    await inAppMessaging().triggerEvent(eventName);
  } catch (error) {
    crashlytics.recordError(error as Error);
  }
};

/**
 * Check if in-app messages are currently suppressed
 */
export const isMessagesDisplaySuppressed = async (): Promise<boolean> => {
  try {
    return await inAppMessaging().isMessagesDisplaySuppressed();
  } catch (error) {
    crashlytics.recordError(error as Error);
    return false;
  }
};

export default {
  setMessagesDisplaySuppressed,
  triggerEvent,
  isMessagesDisplaySuppressed
};