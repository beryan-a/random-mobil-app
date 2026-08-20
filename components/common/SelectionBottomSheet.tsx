import React from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { BottomSheet } from "./BottomSheet";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface SelectionOption {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  value: string | number;
}

interface SelectionBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  options: SelectionOption[];
  selectedValue?: string | number;
  onSelect: (option: SelectionOption) => void;
  height?: number | string;
  showSelectedCheck?: boolean;
}

export const SelectionBottomSheet: React.FC<SelectionBottomSheetProps> = ({
  isVisible,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
  height = "50%",
  showSelectedCheck = true,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleSelect = (option: SelectionOption) => {
    onSelect(option);
    onClose();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={title}
      height={height}
    >
      <ScrollView className="max-h-[500px]">
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`flex-row items-center p-4 mb-2 rounded-lg border-b border-gray-200 ${
              selectedValue === option.value
                ? "bg-gray-100 dark:bg-slate-700"
                : ""
            }`}
            onPress={() => handleSelect(option)}
          >
            {option.icon && (
              <Ionicons
                name={option.icon}
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={{ marginRight: 12 }}
              />
            )}
            <Text className="text-base flex-1 text-gray-700 dark:text-white">
              {option.label}
            </Text>
            {showSelectedCheck && selectedValue === option.value && (
              <Ionicons
                name="checkmark"
                size={24}
                color={isDark ? "#fff" : "#4CAF50"}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomSheet>
  );
};
