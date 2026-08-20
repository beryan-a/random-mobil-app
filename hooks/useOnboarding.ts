import { useState, useEffect } from "react";
import storage from '@/services/storage';

const ONBOARDING_KEY = "has_seen_onboarding";

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await storage.getItem(ONBOARDING_KEY);
      setHasSeenOnboarding(!!status);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    hasSeenOnboarding,
  };
};
