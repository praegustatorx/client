// src/components/ui/StyledButton.tsx
import { FC } from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

interface StyledButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
}

const StyledButton: FC<StyledButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  className = "",
  textClassName = "",
}) => {
  const variantStyles = {
    primary: "bg-[#3662AA] text-white",
    secondary: "bg-white border border-[#3662AA] text-[#3662AA]",
  };

  const sizeStyles = {
    sm: "py-2 px-4 rounded-md text-sm",
    md: "py-3 px-5 rounded-xl text-base",
    lg: "py-4 px-6 rounded-2xl text-lg",
  };

  const baseContainer = "items-center justify-center";
  const baseText = "font-bold text-center";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${baseContainer} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <Text
        className={`${baseText} ${variantStyles[variant]
          .split(" ")
          .find((c) => c.startsWith("text-"))} ${textClassName}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
