import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { useState } from "react";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useQuery } from "react-query";
import { fetchPantry, FetchPantryResponse } from "@/src/api/api";
import PantryList from "@/src/components/PantryListComponents/PantryList";
import EmptyPantryList from "@/src/components/PantryListComponents/EmptyPantryList";
import ErrorScreen from "@/src/components/PantryListComponents/ErrorScreen";
import { Image } from "expo-image";
import MessageScreen from "@/src/components/PantryListComponents/MessageScreen";

import NavigationHeader from "@/src/components/NavigationHeader/NavigationHeader";
import FloatingButton from "@/src/components/PantryListComponents/FloatingButtons/FloatingButton";
import LoadingScreen from "@/src/components/Shared/LoadingScreen";
import { useSession } from "@/src/providers/auth/AuthProvider";

export default function TabOneScreen() {
  const { user } = useSession();

  const { data, refetch, isError, isLoading } = useQuery<
    FetchPantryResponse,
    Error
  >({
    queryKey: ["pantryItems"],
    queryFn: () => fetchPantry("user123"), // TODO: remove hardcoding
  });

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isError) {
    return <ErrorScreen />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data && data.ingredients.length <= 0) {
    return (
      <>
        <MessageScreen
          image={require("@/assets/images/no-data.png")}
          message="Your pantry is looking a little empty! Start adding ingredients to keep track of what you have."
        />
        <FloatingButton />
      </>
    );
  }
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <NavigationHeader scrollY={scrollY} title="Pantry" />
        <PantryList
          onScroll={scrollHandler}
          scrollY={scrollY.value}
          data={data?.ingredients}
        />
        <FloatingButton />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 4,
  },
  page: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 800,
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontWeight: 300,
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
