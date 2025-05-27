import { useState } from "react";
import {
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import {
  Text as StyledText,
  View as StyledView,
  Feather,
} from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../providers/auth/AuthProvider";
import WaveBackground from "@/src/components/WaveBackground";
import BaseInput from "@/src/components/inputs/BaseInput";
import BaseButton from "@/src/components/BaseButton";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
  const { signIn } = useSession();

  const handleLogin = () => {
    if (email && password) {
      signIn(email, password);
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <WaveBackground />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View className="px-8 w-full">
            <StyledText className="font-bold text-3xl mb-5">Login</StyledText>
            {/* Email Input */}
            <View className="flex-row items-center w-full mb-5 relative">
              <View className="mr-4">
                <Feather name="mail" size={22} />
              </View>
              <BaseInput
                placeholder="Email ID"
                onChangeText={setEmail}
                value={email}
                testID="email-input"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center w-full mb-5 relative">
              <View className="mr-4">
                <Feather name="lock" size={22} />
              </View>
              <BaseInput
                placeholder="Password"
                secureTextEntry={!passwordIsVisible}
                onChangeText={setPassword}
                value={password}
                testID="password-input"
              />
              <TouchableOpacity
                className="absolute right-0"
                onPress={() => setPasswordIsVisible(!passwordIsVisible)}
              >
                <Feather
                  name={passwordIsVisible ? "eye" : "eye-off"}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="self-end">
              <StyledText className="text-base font-medium">
                Forgot password?
              </StyledText>
            </TouchableOpacity>

            <BaseButton
              onPress={handleLogin}
              variant="primary"
              size="sm"
              testID="login-button"
            >
              Login
            </BaseButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;
