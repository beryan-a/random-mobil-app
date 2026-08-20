declare module "react-native-onboarding-swiper" {
  import { ComponentType } from "react";
  import { ViewStyle, TextStyle } from "react-native";

  interface Page {
    backgroundColor: string;
    image: React.ReactElement;
    title: string;
    subtitle: string;
  }

  interface OnboardingProps {
    pages: Page[];
    onDone: () => void;
    onSkip?: () => void;
    nextLabel?: React.ReactElement;
    skipLabel?: React.ReactElement;
    DoneButtonComponent?: ComponentType<any>;
    containerStyles?: ViewStyle;
    titleStyles?: TextStyle;
    subTitleStyles?: TextStyle;
    bottomBarHighlight?: boolean;
  }

  const Onboarding: React.FC<OnboardingProps>;
  export default Onboarding;
}
