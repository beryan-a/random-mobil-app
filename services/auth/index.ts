import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

/**
 * Authentication result type
 */
export interface AuthResult {
  success: boolean;
  error: string | null;
  user?: FirebaseAuthTypes.User | null;
  confirmation?: FirebaseAuthTypes.ConfirmationResult | null;
}

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredential.user.updateProfile({ displayName });
    return { 
      success: true, 
      error: null,
      user: userCredential.user
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error: error.code,
      user: null
    };
  }
};

/**
 * Sign in with email and password
 */
export const loginWithEmail = async (
  email: string, 
  password: string
): Promise<AuthResult> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return { 
      success: true, 
      error: null,
      user: userCredential.user
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    return { 
      success: false, 
      error: error.code,
      user: null
    };
  }
};

/**
 * Sign in anonymously
 */
export const loginAnonymously = async (): Promise<AuthResult> => {
  try {
    const userCredential = await auth().signInAnonymously();
    return { 
      success: true, 
      error: null,
      user: userCredential.user
    };
  } catch (error: any) {
    console.error("Anonymous Login Error:", error);
    return { 
      success: false, 
      error: error.code,
      user: null
    };
  }
};

/**
 * Sign out the current user
 */
export const logout = async (): Promise<AuthResult> => {
  try {
    await auth().signOut();
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Logout Error:", error);
    return { success: false, error: error.code };
  }
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async (): Promise<AuthResult> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const { idToken } = userInfo;
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(googleCredential);
    return { 
      success: true, 
      error: null,
      user: userCredential.user
    };
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      user: null
    };
  }
};

/**
 * Sign in with Apple
 */
export const loginWithApple = async (): Promise<AuthResult> => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const { identityToken } = credential;
    if (!identityToken) {
      throw new Error('Apple Sign-In failed: No identity token returned');
    }
    
    const appleCredential = auth.AppleAuthProvider.credential(identityToken);
    const userCredential = await auth().signInWithCredential(appleCredential);
    
    return { 
      success: true, 
      error: null,
      user: userCredential.user
    };
  } catch (error: any) {
    if (error.code === "ERR_REQUEST_CANCELED") {
      return { 
        success: false, 
        error: "user_cancelled",
        user: null
      };
    }
    console.error("Apple Sign-In Error:", error);
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      user: null
    };
  }
};

/**
 * Initiate phone number verification
 */
export const verifyPhoneNumber = async (phoneNumber: string): Promise<AuthResult> => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return { 
      success: true, 
      confirmation, 
      error: null 
    };
  } catch (error: any) {
    console.error("Phone verification error:", error);
    return { 
      success: false, 
      confirmation: null, 
      error: error.code 
    };
  }
};

/**
 * Confirm phone verification code
 */
export const confirmPhoneNumber = async (
  confirmation: FirebaseAuthTypes.ConfirmationResult, 
  code: string
): Promise<AuthResult> => {
  try {
    const userCredential = await confirmation.confirm(code);
    return { 
      success: true, 
      error: null,
      user: userCredential?.user
    };
  } catch (error: any) {
    console.error("Phone confirmation error:", error);
    return { 
      success: false, 
      error: error.code,
      user: null
    };
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
  try {
    // Check if the email exists
    const methods = await auth().fetchSignInMethodsForEmail(email);
    if (methods.length === 0) {
      return {
        success: false,
        error: "auth/user-not-found",
      };
    }

    await auth().sendPasswordResetEmail(email);
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Password reset error:", error);
    return { success: false, error: error.code };
  }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): FirebaseAuthTypes.User | null => {
  return auth().currentUser;
};

/**
 * Get the list of auth providers for the current user
 */
export const getProviders = (): string[] => {
  const user = getCurrentUser();
  return user?.providerData.map((provider) => provider.providerId) || [];
};

/**
 * Add an auth state change listener
 */
export const onAuthStateChanged = (
  callback: (user: FirebaseAuthTypes.User | null) => void
): () => void => {
  return auth().onAuthStateChanged(callback);
};

// Create a default export with all functions for easier import
export default {
  registerWithEmail,
  loginWithEmail,
  loginAnonymously,
  logout,
  loginWithGoogle,
  loginWithApple,
  verifyPhoneNumber,
  confirmPhoneNumber,
  sendPasswordResetEmail,
  getCurrentUser,
  getProviders,
  onAuthStateChanged
};