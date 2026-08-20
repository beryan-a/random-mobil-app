import i18n from '../i18n';

/**
 * Handles Firebase authentication errors and returns localized error messages
 */
export const handleFirebaseError = (errorCode: string): string => {
  const errorMap: Record<string, string> = {
    'auth/email-already-in-use': 'errors.auth.emailInUse',
    'auth/invalid-email': 'errors.auth.invalidEmail',
    'auth/user-disabled': 'errors.auth.userDisabled',
    'auth/user-not-found': 'errors.auth.userNotFound',
    'auth/wrong-password': 'errors.auth.wrongPassword',
    'auth/weak-password': 'errors.auth.weakPassword',
    'auth/invalid-verification-code': 'errors.auth.invalidCode',
    'auth/invalid-verification-id': 'errors.auth.invalidVerification',
    'auth/invalid-phone-number': 'errors.auth.invalidPhone',
    'auth/quota-exceeded': 'errors.auth.quotaExceeded',
    'auth/operation-not-allowed': 'errors.auth.operationNotAllowed',
    'auth/network-request-failed': 'errors.network.requestFailed',
    'auth/too-many-requests': 'errors.auth.tooManyRequests',
    'auth/requires-recent-login': 'errors.auth.requiresRecentLogin',
    'auth/provider-already-linked': 'errors.auth.providerAlreadyLinked',
    'auth/credential-already-in-use': 'errors.auth.credentialInUse',
    'auth/popup-closed-by-user': 'errors.auth.popupClosed',
    'user_cancelled': 'errors.auth.userCancelled',
  };

  const translationKey = errorMap[errorCode] || 'errors.unknown';
  return i18n.t(translationKey);
};

/**
 * Logs error details and returns user-friendly message
 */
export const logError = (
  error: any, 
  context: string, 
  showRawError = false
): string => {
  console.error(`Error in ${context}:`, error);
  
  if (error?.code) {
    return handleFirebaseError(error.code);
  }
  
  if (showRawError && error?.message) {
    return error.message;
  }
  
  return i18n.t("errors.unknown");
};
