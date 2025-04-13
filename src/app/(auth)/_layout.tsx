import { Stack } from "expo-router";
const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="LoginPage"
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          // gestureEnabled: false,
        }}
      />
      <Stack.Screen name="SignUpPage" options={{ headerShown: false }} />
    </Stack>
  );
};
export default AuthLayout;
