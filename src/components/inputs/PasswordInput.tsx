import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather, Text } from "../Themed";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import BaseInput from "./BaseInput";
import ValidationMessage from "./ValidationMessage";
import * as passwordUtils from "@/src/utils/passwordUtils";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  passwordIsVisible: boolean;
  setPasswordIsVisible: (isVisible: boolean) => void;
  withValidationMessages?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  passwordIsVisible,
  setPasswordIsVisible,
  withValidationMessages,
}) => {
  const constraintVisible = useSharedValue(0);
  const formatVisible = useSharedValue(0);

  const handlePasswordBlur = () => {
    const constraintError = passwordUtils.validatePasswordLength(password);
    const formatError = passwordUtils.isPasswordFormatInvalid(password);

    // Animate error boxes independently
    constraintVisible.value = withTiming(
      password.length > 0 && constraintError ? 1 : 0,
      { duration: 300 }
    );

    formatVisible.value = withTiming(
      password.length > 0 && formatError ? 1 : 0,
      { duration: 300 }
    );
  };

  //this maybe can be optimized, I just cant be bothered
  const constraintStyle = useAnimatedStyle(() => ({
    opacity: constraintVisible.value,
    height: constraintVisible.value === 1 ? withTiming(40) : withTiming(0),
    marginTop: constraintVisible.value === 1 ? withTiming(4) : withTiming(0),
  }));

  const formatStyle = useAnimatedStyle(() => ({
    opacity: formatVisible.value,
    height: formatVisible.value === 1 ? withTiming(40) : withTiming(0),
    marginTop: formatVisible.value === 1 ? withTiming(4) : withTiming(0),
  }));

  const validationComponent = (
    <>
      <ValidationMessage
        message="Password must be between 8 and 36 characters"
        style={constraintStyle}
      />
      <ValidationMessage
        message="Passwords must include at least one uppercase letter and one number"
        style={formatStyle}
      />
    </>
  );

  return (
    <View className="flex items-center justify-center mb-2">
      <View className="flex-row items-center w-full relative">
        <View className="mr-4">
          <Feather name="lock" size={22} />
        </View>
        <BaseInput
          placeholder="Password"
          secureTextEntry={!passwordIsVisible}
          onChangeText={setPassword}
          value={password}
          testID="password-input"
          textContentType="none"
          autoComplete="off"
          onEndEditing={handlePasswordBlur}
        />
        <TouchableOpacity
          className="absolute right-0"
          onPress={() => setPasswordIsVisible(!passwordIsVisible)}
        >
          <Feather name={passwordIsVisible ? "eye" : "eye-off"} size={20} />
        </TouchableOpacity>
      </View>

      {withValidationMessages && validationComponent}
    </View>
  );
};

export default PasswordInput;
