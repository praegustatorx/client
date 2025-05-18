import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { View } from "react-native";
import { Text } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useSession } from "@/src/providers/auth/AuthProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

function TabBarIcon(props: {
  name: string;
  color: string;
  library: "FontAwesome" | "MaterialCommunityIcons"; // Add a 'library' prop to specify the icon library
}) {
  const { name, color, library } = props;

  if (library === "FontAwesome") {
    return (
      <FontAwesome
        name={name as any}
        size={20}
        color={color}
        style={{ marginBottom: -3 }}
      />
    );
  }

  if (library === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        name={name as any}
        size={20}
        color={color}
        style={{ marginBottom: -3 }}
      />
    );
  }

  return null; // In case the library is not provided or is invalid
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          headerShadowVisible: true,
          title: "Pantry",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="fridge"
              color={color}
              library="MaterialCommunityIcons"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShadowVisible: true,
          headerShown: false,
          title: "Cookbook",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book" color={color} library="FontAwesome" />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "User",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} library="FontAwesome" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarStyle: {
            borderTopWidth: 0,
          },
          title: "Foodie",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comment" color={color} library="FontAwesome" />
          ),
        }}
      />
    </Tabs>
  );
}
