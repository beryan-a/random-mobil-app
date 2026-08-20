# React Native Starter Kit with Expo

A powerful, clean, and maintainable starter kit built with Expo, featuring authentication, analytics, in-app purchases, and more. This boilerplate is designed with simplicity and developer experience in mind using functional programming patterns.

##### Before you start, search 'TODO' in the project and replace them with the correct values

## Features

- 🔐 Authentication (Email, Google, Apple, Phone)
- 💰 In-App Purchases (RevenueCat)
- 📊 Analytics (Firebase)
- 🌍 Internationalization (i18n)
- 🎨 Styled with NativeWind (Tailwind CSS)
- 🔔 Push Notifications (Firebase)
- 🚨 Error Tracking (Crashlytics)
- 🎯 Onboarding Screens
- 🌙 Dark Mode Support
- 🌍 RTL Support
- 💬 ChatGPT Integration (Firebase Functions)

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) or [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/salik-a/rntemplate.git
cd rntemplate
```

2. Install dependencies: (You can use yarn or npm)

```bash
npm install
npx expo prebuild --clean
# If you want to install the platform specific dependencies
npx expo run:ios
npx expo run:android
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
EXPO_PUBLIC_COMPANY_NAME=your_company_name
EXPO_PUBLIC_PRIVACY_POLICY_URL=your_privacy_policy_url
EXPO_PUBLIC_TERMS_OF_USE_URL=your_terms_url
EXPO_PUBLIC_REVENUECAT_IOS_KEY=your_revenuecat_ios_key
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=your_revenuecat_android_key
EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID=your_entitlement_id
```

### Required Setup

#### 1. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Go Auth -> Sign-in method -> Google -> Web client ID copy-paste to .env file
3. Go Auth -> Sign-in method -> Enable Login Methods(Anonymous, Email/Password, Google, Apple, Phone)
4. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
5. Place these files in your project root directory

#### 2. RevenueCat Setup

1. Create an account at [RevenueCat](https://www.revenuecat.com/)
2. Get your API keys from the dashboard
3. Configure your products and entitlements
4. Follow the [RevenueCat Setup Guide](https://www.revenuecat.com/docs/getting-started)

### Configuration Files

Important files you need to modify:

1. `app.json`:
   - Update `expo.name`
   - Update `expo.slug`
   - Update bundle/package identifiers

2. `translations/`:
   - `en.json`: English translations
   - `tr.json`: Turkish translations
   - `ar.json`: Arabic translations
   - Add or modify texts as needed

3. `constants.ts`:
   - Update `SUPPORTED_LANGUAGES` if needed
   - Modify any other constants

Note: you can search 'TODO' in the project and replace them with the correct values

## Project Structure

```
├── app/                 # Main application screens (Expo Router)
│   ├── (app)/           # Authenticated screens
│   └── (auth)/          # Authentication screens
├── assets/              # Images, fonts, etc.
├── components/          # Reusable UI components
├── context/             # Global state management
├── services/            # Business logic and API services
│   ├── analytics/       # Analytics service
│   ├── auth/            # Authentication service
│   ├── database/        # Firestore database service
│   ├── error-handling/  # Error handling utilities
│   ├── i18n/            # Internationalization service
│   ├── payment/         # In-app purchase handling
│   ├── messaging/       # Push notifications service
│   ├── storage/         # Local storage management
│   └── ads/             # Google mobile ads service
├── hooks/               # Custom React hooks
├── translations/        # Language files
└── types/               # TypeScript type definitions
```

## Services Layer Architecture

The project follows a functional approach to services, making the code cleaner and more testable:

### Authentication Service

```typescript
// Import the entire auth service
import auth from '@/services/auth';

// Usage
await auth.loginWithEmail(email, password);
await auth.logout();

// Or import specific functions
import { loginWithGoogle } from '@/services/auth';

// Usage
await loginWithGoogle();
```

### Storage Service

```typescript
import storage from '@/services/storage';

// Store data
storage.setItem('key', value);

// Get data
const value = storage.getItem('key');

// Remove data
storage.removeItem('key');
```

### Internationalization

```typescript
import i18n, { changeLanguage } from '@/services/i18n';

// Get translated text
const text = i18n.t('loginScreen.title');

// Change app language
changeLanguage('fr');
```

### Error Handling

```typescript
import { handleFirebaseError } from '@/services/error-handling';

try {
  // Some operation
} catch (error) {
  const errorMessage = handleFirebaseError(error.code);
  // Show error message to user
}
```

### Payment (In-App Purchases)

```typescript
import payment from '@/services/payment';

// Show paywall
await payment.presentPaywall();

// Check user entitlements
const isPremium = await payment.checkEntitlements();
```

## Styling with NativeWind

This project uses NativeWind (Tailwind CSS for React Native) for styling:

```tsx
<View className="flex-1 p-4 bg-white dark:bg-slate-900">
  <Text className="text-xl font-bold text-gray-800 dark:text-white">
    {i18n.t('welcomeScreen.title')}
  </Text>
  <TouchableOpacity 
    className="mt-4 px-4 py-2 bg-blue-500 rounded-lg"
    onPress={onButtonPress}
  >
    <Text className="text-white font-medium">
      {i18n.t('common.getStarted')}
    </Text>
  </TouchableOpacity>
</View>
```

## Firebase Integration

The starter kit includes comprehensive integration with Firebase services:

- **Authentication**: Email/password, Google, Apple, Phone
- **Analytics**: Event tracking and user properties
- **Crashlytics**: Error reporting
- **Firestore**: Database operations
- **Cloud Messaging**: Push notifications
- **Functions**: Server functions including ChatGPT integration

## AI Integration

### Chat Interface

The starter kit includes a chat interface connected to ChatGPT:

1. Navigate to `app/(app)/chat.tsx`
2. Setup requires a Firebase function deployment

### Setting Up ChatGPT Integration

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Set environment variables:

```bash
firebase functions:config:set OPENAI_API_KEY="your_openai_api_key"
```

4. Deploy functions:

```bash
cd firebase-functions
npm run build
npm run deploy
```

## Documentation Links

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Setup Guide](https://firebase.google.com/docs/ios/setup)
- [RevenueCat Documentation](https://www.revenuecat.com/docs)
- [Google Sign-In Setup](https://docs.expo.dev/guides/google-signin/)
- [Apple Sign-In Setup](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [NativeWind Documentation](https://www.nativewind.dev/v4/overview/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Feel free to ask questions or make suggestions! hi@codebasehub.pro