import { View, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
