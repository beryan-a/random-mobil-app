import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { I18nManager } from "react-native";

// Import translations
import en from "../../translations/en.json"; // English
import tr from "../../translations/tr.json"; // Turkish
import ar from "../../translations/ar.json"; // Arabic
import de from "../../translations/de.json"; // German
import es from "../../translations/es.json"; // Spanish
import hi from "../../translations/hi.json"; // Hindi
import ru from "../../translations/ru.json"; // Russian
import ja from "../../translations/ja.json"; // Japanese
import zh from "../../translations/zh-Hans.json"; // Chinese (Simplified)
import fr from "../../translations/fr.json"; // French
import ko from "../../translations/ko.json"; // Korean
import it from "../../translations/it.json"; // Italian

// Define all available translations
const translations = {
  en,
  tr,
  ar,
  de,
  es,
  hi,
  ru,
  ja,
  zh,
  fr,
  ko,
  it,
};

// Create the i18n instance
const i18n = new I18n(translations);

/**
 * Get the device's language code
 */
export const getDeviceLanguage = (): string => {
  return getLocales()[0].languageCode || "en";
};

/**
 * Check if the language is RTL
 */
export const isRTL = (lang: string): boolean => {
  return lang === "ar" || getLocales()[0].textDirection === "rtl";
};

/**
 * Initialize i18n with device language
 */
export const initializeI18n = (): void => {
  const deviceLanguage = getDeviceLanguage();
  
  // Set up i18n
  i18n.locale = deviceLanguage;
  i18n.enableFallback = true;
  
  // Handle RTL
  const shouldUseRTL = isRTL(deviceLanguage);
  I18nManager.allowRTL(shouldUseRTL);
  I18nManager.forceRTL(shouldUseRTL);
};

/**
 * Change application language
 */
export const changeLanguage = (lang: string): void => {
  i18n.locale = lang;
  
  // Handle RTL
  const shouldUseRTL = isRTL(lang);
  I18nManager.allowRTL(shouldUseRTL);
  I18nManager.forceRTL(shouldUseRTL);
};

/**
 * Get all supported languages with their locale codes and native names
 */
export const getSupportedLanguages = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '简体中文' },
    { code: 'fr', name: 'Français' },
    { code: 'ko', name: '한국어' },
    { code: 'it', name: 'Italiano' },
  ];
};

// Initialize on import
initializeI18n();

// Export default i18n instance
export default i18n;