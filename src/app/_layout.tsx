import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AuthProvider } from "../providers/auth/AuthProvider";
import { useColorScheme } from "@/src/components/useColorScheme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../global.css";
import { NotificationToastProvider } from "../providers/ToastContext";
import { PredictedItemProvider } from "../providers/PredictedItemContext";
import { PantryItemProvider } from "../providers/PantryItemContext";
import { RecipeItemProvider } from "../providers/RecipeItemContext";
import { RecipeCardsProvider } from "../providers/RecipeCardsContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(app)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient();
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationToastProvider>
            <RecipeItemProvider>
              <RecipeCardsProvider>
                <PantryItemProvider>
                  <PredictedItemProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen
                        name="modal"
                        options={{
                          presentation: "modal",
                        }}
                      />
                    </Stack>
                  </PredictedItemProvider>
                </PantryItemProvider>
              </RecipeCardsProvider>
            </RecipeItemProvider>
          </NotificationToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
