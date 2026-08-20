export type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  colorScheme: "light" | "dark" | "system";
  setColorScheme: (value: "light" | "dark" | "system") => void;
};

export type DeepLinkData = {
  deepLinkStatus: "FOUND" | "NOT_FOUND";
  status: string;
  type: string;
  data: {
    deep_link_value?: string;
    media_source?: string;
    [key: string]: any;
  };
};

export type ConversionData = {
  status: string;
  type: string;
  data: {
    is_first_launch: boolean;
    [key: string]: any;
  };
};
