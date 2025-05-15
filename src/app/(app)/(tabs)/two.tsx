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
import { fetchCookbook } from "@/src/api/api";
import ErrorScreen from "@/src/components/PantryListComponents/ErrorScreen";
import LoadingScreen from "@/src/components/Shared/LoadingScreen";
import TabTitle from "@/src/components/Shared/TabTitle";
import { useSession } from "@/src/providers/auth/AuthProvider";

const AnimatedMasonryFlashList =
  Animated.createAnimatedComponent(MasonryFlashList);

const { width } = Dimensions.get("window");

const dummyData = [
  { id: "1", uri: "https://source.unsplash.com/random/200x300", name: "cool1" },
  { id: "2", uri: "https://source.unsplash.com/random/200x150", name: "cool2" },
  { id: "3", uri: "https://source.unsplash.com/random/200x250", name: "cool3" },
  { id: "4", uri: "https://source.unsplash.com/random/200x220", name: "cool4" },
  { id: "5", uri: "https://source.unsplash.com/random/200x180", name: "cool5" },
];

export default function TabTwoScreen() {
  const { user } = useSession();

  const { data, refetch, isError, isLoading } = useQuery<any, Error>({
    queryKey: ["cookbook"],
    queryFn: () => fetchCookbook(user!.email), // TODO: remove hardcoding
  });

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // if (isError) {
  //   return <ErrorScreen />;
  // }

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (data && data.ingredients.length <= 0) {
  //   return (
  //     <>
  //       <MessageScreen
  //         image={require("@/assets/images/no-data.png")}
  //         message="Your pantry is looking a little empty! Start adding ingredients to keep track of what you have."
  //       />
  //     </>
  //   );
  // }
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <NavigationHeader scrollY={scrollY} title="Cookbook" />
        <AnimatedMasonryFlashList
          data={dummyData}
          onScroll={scrollHandler}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={50}
          numColumns={2}
          renderItem={({ item, index }) => (
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
