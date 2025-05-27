import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from "react-native";
import { Text as StyledText } from "../../components/Themed";
import { router } from "expo-router";
import { useRegisterMutation } from "@/src/hooks/mutations/useRegisterMutation";
import { SafeAreaView } from "react-native-safe-area-context";
import WavyBackground from "@/src/components/WaveBackground";
import EmailInput from "@/src/components/inputs/EmailInput";
import NameInput from "@/src/components/inputs/NameInput";
import PasswordInput from "@/src/components/inputs/PasswordInput";
import ConfirmPasswordInput from "@/src/components/inputs/ConfirmPasswordInput";
import BaseButton from "@/src/components/BaseButton";
import * as passwordUtils from "@/src/utils/passwordUtils";
import { validateEmail } from "@/src/utils/emailUtils";
import { ErrorResponse } from "@/src/api/api";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

  const register = useRegisterMutation();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!passwordUtils.comparePasswords(password, confirmPassword)) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (passwordUtils.validatePasswordLength(password)) {
      Alert.alert("Error", "Password must be between 8 and 36 characters long");
      return;
    }

    if (passwordUtils.isPasswordFormatInvalid(password)) {
      Alert.alert(
        "Error",
        "Password must contain at least one uppercase letter and one number"
      );
      return;
    }

    await register.mutateAsync(
      { email, name, password },
      {
        onSuccess: (data) => {
          router.push("/");
          Alert.alert("Registration successful", "You can now try and log in");
        },
      onError: (error: ErrorResponse) => {
          Alert.alert("Error", error.message);
        },
      }
    );
  };

  return (
    <SafeAreaView className="h-full flex">
      <WavyBackground />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <View className="px-8 w-full">
            <StyledText className="font-bold text-3xl mb-5">Sign Up</StyledText>

            <EmailInput
              email={email}
              isEmailValid={isEmailValid}
              setEmail={setEmail}
              setIsEmailValid={setIsEmailValid}
              withValidationComponent={true}
            />
            <NameInput name={name} setName={setName} />

            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordIsVisible={passwordIsVisible}
              setPasswordIsVisible={setPasswordIsVisible}
              withValidationMessages={true}
            />
            <ConfirmPasswordInput
              password={password}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordIsVisible={passwordIsVisible}
              setPasswordIsVisible={setPasswordIsVisible}
            />
            <BaseButton
              onPress={handleSignUp}
              variant="primary"
              size="sm"
              testID="sign-up-button"
            >
              Sign Up
            </BaseButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpPage;
