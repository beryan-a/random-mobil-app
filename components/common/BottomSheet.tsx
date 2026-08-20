import React, { useEffect, useRef } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  hideCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  height?: number | string;
  children: React.ReactNode;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  title,
  hideCloseButton = false,
  closeOnBackdropPress = true,
  height = "50%",
  children,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Animation values
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Calculate content height
  const contentHeight =
    typeof height === "number"
      ? height
      : SCREEN_HEIGHT * (parseInt(height) / 100);

  // Set up pan responder for dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnimation.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // User dragged down enough to close
          closeSheet();
        } else {
          // Reset position
          Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  // Open and close animations
  useEffect(() => {
    if (isVisible) {
      openSheet();
    }
  }, [isVisible]);

  const openSheet = () => {
    // Reset the animation value
    slideAnimation.setValue(contentHeight);

    // Start animations
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnimation, {
        toValue: 0,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimation, {
        toValue: contentHeight,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
    >
      <View className="flex-1 justify-end">
        {/* Backdrop */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { opacity: backdropOpacity },
            { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          ]}
          className="absolute inset-0"
        >
          {closeOnBackdropPress && (
            <TouchableOpacity
              style={StyleSheet.absoluteFillObject}
              onPress={closeSheet}
              activeOpacity={1}
            />
          )}
        </Animated.View>

        {/* Content Container */}
        <Animated.View
          style={[
            { transform: [{ translateY: slideAnimation }] },
            { maxHeight: typeof height === "string" ? height : height },
          ]}
          className={`bg-white dark:bg-slate-800 rounded-t-3xl overflow-hidden`}
        >
          {/* Drag Handle */}
          <View
            {...panResponder.panHandlers}
            className="w-full items-center pt-2 pb-4"
          >
            <View className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          </View>

          {/* Header */}
          {(title || !hideCloseButton) && (
            <View className="flex-row justify-between items-center p-6">
              {title ? (
                <Text className="text-xl font-semibold text-gray-800 dark:text-white">
                  {title}
                </Text>
              ) : (
                <View />
              )}

              {!hideCloseButton && (
                <TouchableOpacity
                  onPress={closeSheet}
                  className="p-1" // Larger touch target
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={isDark ? "#fff" : "#000"}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <View className="px-6 pb-6">{children}</View>

          {/* Extra padding for bottom safe area */}
          {Platform.OS === "ios" && <View className="h-6" />}
        </Animated.View>
      </View>
    </Modal>
  );
};
