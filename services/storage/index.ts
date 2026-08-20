import { MMKV } from "react-native-mmkv";

// Create a new instance of MMKV storage
export const storage = new MMKV();

/**
 * Save a value to storage with the given key
 * @param key - Storage key
 * @param value - Value to store (will be JSON stringified)
 */
export const setItem = (key: string, value: any): void => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key} in storage:`, error);
  }
};

/**
 * Get a value from storage by key
 * @param key - Storage key
 * @param defaultValue - Default value to return if key is not found
 * @returns The stored value or defaultValue if not found
 */
export const getItem = <T = any>(key: string, defaultValue?: T): T | null => {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : defaultValue ?? null;
  } catch (error) {
    console.error(`Error retrieving ${key} from storage:`, error);
    return defaultValue ?? null;
  }
};

/**
 * Check if a key exists in storage
 * @param key - Storage key
 * @returns Boolean indicating if the key exists
 */
export const hasItem = (key: string): boolean => {
  return storage.contains(key);
};

/**
 * Remove a value from storage by key
 * @param key - Storage key
 */
export const removeItem = (key: string): void => {
  try {
    storage.delete(key);
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
  }
};

/**
 * Clear all stored values
 */
export const clearStorage = (): void => {
  try {
    storage.clearAll();
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

/**
 * Get all storage keys
 * @returns Array of all storage keys
 */
export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};

// Default export with all functions
export default {
  setItem,
  getItem,
  hasItem,
  removeItem,
  clearStorage,
  getAllKeys
};