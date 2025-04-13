import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Text, Feather } from "../Themed";
import BaseInput from "./BaseInput";
import ValidationMessage from "./ValidationMessage";

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ConfirmPasswordInputProps {
  password: string;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  passwordIsVisible: boolean;
  setPasswordIsVisible: (isVisible: boolean) => void;
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  password,
  confirmPassword,
  setConfirmPassword,
  passwordIsVisible,
  setPasswordIsVisible,
}) => {
  const matchingPasswordsErrorVisible = useSharedValue(0);

  const comparePasswords = (password: string, confirmPassword: string) => {
    return password == confirmPassword;
  };

  const handlePasswordBlur = () => {
    const isMatching = comparePasswords(password, confirmPassword);

    matchingPasswordsErrorVisible.value = withTiming(
      password.length > 0 && confirmPassword.length > 0 && !isMatching ? 1 : 0,
      { duration: 300 }
    );
  };

  const validationPassworErrorStyle = useAnimatedStyle(() => ({
    opacity: matchingPasswordsErrorVisible.value,
    height:
      matchingPasswordsErrorVisible.value === 1
        ? withTiming(40)
        : withTiming(0),
    marginTop:
      matchingPasswordsErrorVisible.value === 1 ? withTiming(4) : withTiming(0),
  }));

  const validationComponent = (
    <ValidationMessage
      message="Passwords do not match!"
      style={validationPassworErrorStyle}
    />
  );
  return (
    <View className="flex items-center justify-center mb-2">
      <View className="flex-row items-center w-full relative">
        <View className="mr-4">
          <Feather name="lock" size={22} />
        </View>
        <BaseInput
          placeholder="Confirm Password"
          secureTextEntry={!passwordIsVisible}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          testID="confirm-password-input"
          onBlur={handlePasswordBlur}
        />
        <TouchableOpacity
          className="absolute right-0"
          onPress={() => setPasswordIsVisible(!passwordIsVisible)}
        >
          <Feather name={passwordIsVisible ? "eye" : "eye-off"} size={20} />
        </TouchableOpacity>
      </View>
      {validationComponent}
    </View>
  );
};

export default ConfirmPasswordInput;
