import { type FC, useEffect } from "react";
import { View, TextInput } from "react-native";
import { Text, Feather } from "../Themed";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import BaseInput from "./BaseInput";
import ValidationMessage from "./ValidationMessage";
import { validateEmail } from "@/src/utils/emailUtils";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  isEmailValid: boolean;
  setIsEmailValid: (isValid: boolean) => void;
  withValidationComponent?: boolean;
}

const EmailInput: FC<EmailInputProps> = ({
  email,
  setEmail,
  isEmailValid,
  setIsEmailValid,
  withValidationComponent,
}) => {
  const emailErrorVisible = useSharedValue(0);
  useEffect(() => {
    emailErrorVisible.value = withTiming(
      email.length > 0 && !isEmailValid ? 1 : 0,
      {
        duration: 300,
      }
    );
  }, [isEmailValid, email]);

  const emailErrorStyle = useAnimatedStyle(() => ({
    opacity: emailErrorVisible.value,
    height: emailErrorVisible.value === 1 ? withTiming(40) : withTiming(0),
    marginTop: emailErrorVisible.value === 1 ? withTiming(4) : withTiming(0),
  }));

  const validationComponent = (
    <ValidationMessage message="Invalid email format" style={emailErrorStyle} />
  );

  return (
    <View className="flex items-center justify-center mb-2">
      <View className="flex-row items-center w-full relative justify-center">
        <View className="mr-4">
          <Feather name="mail" size={22} />
        </View>

        <BaseInput
          placeholder="Email ID"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          allowFontScaling={true}
          onBlur={() => {
            setIsEmailValid(validateEmail(email));
          }}
          testID="email-input"
        />
      </View>
      {withValidationComponent && validationComponent}
    </View>
  );
};

export default EmailInput;
