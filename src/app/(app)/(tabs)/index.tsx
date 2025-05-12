import { View, SafeAreaView } from "react-native";
import { useState } from "react";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useQuery } from "react-query";
import { fetchPantry, FetchPantryResponse } from "@/src/api/api";
import PantryList from "@/src/components/PantryListComponents/PantryList";
import EmptyPantryList from "@/src/components/PantryListComponents/EmptyPantryList";

import NavigationHeader from "@/src/components/NavigationHeader/NavigationHeader";
import FloatingButton from "@/src/components/PantryListComponents/FloatingButtons/FloatingButton";

export default function TabOneScreen() {
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

  // if (isLoading) {
  //   return (
  //     <ErrorView customErrorMessage="Fetching your pantry... Hang tight!" />
  //   );
  // }

  // if (isError) {
  //   return <ErrorView />;
  // }

  // if (data && data.ingredients.length <= 0) {
  //   return <EmptyPantryView />;
  // }

  return (
    <SafeAreaView className="h-[100%]">
      <View className="flex-1 px-2">
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
