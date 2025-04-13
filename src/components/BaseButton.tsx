import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FC, ReactNode } from "react";
import { Text } from "./Themed";
interface BaseButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const BaseButton: FC<BaseButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  ...props
}) => {
  let sizeClasses = "py-3 text-base";
  if (size === "sm") sizeClasses = "py-2 text-lg";
  if (size === "lg") sizeClasses = "py-4 text-xl";

  let buttonClasses =
    "rounded-xl mt-5 items-center justify-center " + sizeClasses;
  let textClasses = "font-bold " + sizeClasses;

  if (variant === "primary") {
    buttonClasses += " bg-[#006d5b]";
    textClasses += " text-white";
  } else if (variant === "secondary") {
    buttonClasses += " bg-transparent border border-[#abb8c3]";
    textClasses += " text-[#006d5b] ";
  }

  return (
    <TouchableOpacity className={buttonClasses} {...props}>
      <Text lightColor="white" darkColor="white" className={textClasses}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default BaseButton;
