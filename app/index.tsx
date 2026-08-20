import { Redirect } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import LoadingScreen from "@/components/common/LoadingScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import { useOnboarding } from "@/hooks/useOnboarding";

const Index = () => {
  const { isAuthenticated, isLoading } = useAppContext();
  const { isLoading: isLoadingOnboarding, hasSeenOnboarding } = useOnboarding();

  if (isLoading || isLoadingOnboarding) {
    return <LoadingScreen />;
  }

  // Show onboarding if user hasn't seen it yet
  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  // Normal authentication flow
  if (isAuthenticated) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default Index;
