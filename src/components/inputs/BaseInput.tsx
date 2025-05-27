import { TextInput, TextInputProps, useColorScheme } from "react-native";
import { FC } from "react";

const BaseInput: FC<TextInputProps> = (props) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const textColor = isDarkMode ? "text-white" : "text-black";
  const placeholderColor = isDarkMode ? "#D1D5DB" : "#6B7280";

  return (
    <TextInput
      className={`flex flex-1 border-b border-gray-200 text-xl h-9 py-2 pl-1 ${textColor}
      }`}
      placeholderTextColor={placeholderColor}
      style={{
        lineHeight: 20,
        textAlignVertical: "center",
        includeFontPadding: false,
      }}
      {...props}
    />
  );
};

export default BaseInput;
