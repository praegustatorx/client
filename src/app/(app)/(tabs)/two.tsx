import React from "react";
import { Dimensions, SafeAreaView, View, StyleSheet } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import RecipeCard from "@/src/components/RecipeCardComponents/RecipeCard";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import NavigationHeader from "@/src/components/NavigationHeader/NavigationHeader";
import MessageScreen from "@/src/components/PantryListComponents/MessageScreen";
import { useQuery } from "@tanstack/react-query";
import { CookbookResponse, fetchCookbook } from "@/src/api/api";
import ErrorScreen from "@/src/components/PantryListComponents/ErrorScreen";
import LoadingScreen from "@/src/components/Shared/LoadingScreen";
import TabTitle from "@/src/components/Shared/TabTitle";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { Recipe } from "@/src/api/api";

const AnimatedMasonryFlashList =
  Animated.createAnimatedComponent(MasonryFlashList);

const { width } = Dimensions.get("window");

export default function TabTwoScreen() {
  const { user } = useSession();

  const { data, refetch, isError, isLoading } = useQuery<
    CookbookResponse,
    Error
  >({
    queryKey: ["cookbook"],
    queryFn: () => fetchCookbook(user!.email), // TODO: remove hardcoding
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

  if (data && (!data.recipes || data.recipes.length === 0)) {
    return (
      <MessageScreen
        image={require("@/assets/images/no-data.png")}
        message="You have no recipes in your cookbook."
      />
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <NavigationHeader scrollY={scrollY} title="Cookbook" />
        <AnimatedMasonryFlashList
          data={data!.recipes}
          onScroll={scrollHandler}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={50}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <RecipeCard item={item} width={width} index={index} />
          )}
          ListHeaderComponent={() => <TabTitle text="Cookbook" />}
        />
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
});
