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
import { useQuery } from "react-query";
import { CookbookResponse, fetchCookbook } from "@/src/api/api";
import ErrorScreen from "@/src/components/PantryListComponents/ErrorScreen";
import LoadingScreen from "@/src/components/Shared/LoadingScreen";
import TabTitle from "@/src/components/Shared/TabTitle";
import { useSession } from "@/src/providers/auth/AuthProvider";

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

  console.log(data?.recipes);

  console.log("data", data);
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
    <SafeAreaView className="h-[100%]">
      <View className="flex-1 px-3 pt-10">
        <Text className="text-3xl font-extrabold">My Recipes</Text>
      </View>
    </SafeAreaView>
  );
}
