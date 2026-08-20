import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

interface WebViewProps {
  url: string;
  title: string;
  isVisible: boolean;
  onClose: () => void;
}

const WebView = ({ url, isVisible, onClose }: WebViewProps) => {
  useEffect(() => {
    if (isVisible) {
      (async () => {
        try {
          await WebBrowser.openBrowserAsync(url);
        } catch (error) {
          console.error("Error opening web browser:", error);
        } finally {
          onClose();
        }
      })();
    }
  }, [isVisible, url, onClose]);

  return null;
};

export default WebView;
