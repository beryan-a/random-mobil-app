import { Slot, usePathname } from "expo-router";
import "../global.css";
import { AppProvider } from "@/context/AppContext";
import ToastManager from "toastify-react-native";
import analytics from '@/services/analytics';
import { useEffect } from "react";

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      analytics.logScreen(pathname);
    }
  }, [pathname]);

  return (
    <AppProvider>
      <ToastManager textStyle={{ fontSize: 12 }} theme="light" />
      <Slot />
    </AppProvider>
  );
}
