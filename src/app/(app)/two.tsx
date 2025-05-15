import React from "react";
import { Dimensions, SafeAreaView, View, StyleSheet } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import RecipeCard from "@/src/components/RecipeComponents/RecipeCard";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
// import TabTitle from "@/src/components/TabTitle";
// import NavigationHeader from "@/src/components/NavigationHeader";

const AnimatedMasonryFlashList =
  Animated.createAnimatedComponent(MasonryFlashList);

const { width } = Dimensions.get("window");

const data = [
  { id: "1", uri: "https://source.unsplash.com/random/200x300", name: "cool1" },
  { id: "2", uri: "https://source.unsplash.com/random/200x150", name: "cool2" },
  { id: "3", uri: "https://source.unsplash.com/random/200x250", name: "cool3" },
  { id: "4", uri: "https://source.unsplash.com/random/200x220", name: "cool4" },
  { id: "5", uri: "https://source.unsplash.com/random/200x180", name: "cool5" },
];

export default function TabTwoScreen() {
  // const { data, refetch, isError, isLoading } = useQuery<
  //   FetchPantryResponse,
  //   Error
  // >({
  //   queryKey: ["pantryItems"],
  //   queryFn: () => fetchPantry("user123"), // TODO: remove hardcoding
  // });

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
  //       <FloatingButton />
  //     </>
  //   );
  // }
  return (
    <SafeAreaView className="h-[100%]" style={styles.container}>
      <View className="flex-1 px-2">
        {/* <NavigationHeader scrollY={scrollY} title="Cookbook" /> */}
        <AnimatedMasonryFlashList
          data={data}
          onScroll={scrollHandler}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={50}
          numColumns={2}
          renderItem={({ item }) => <RecipeCard item={item} width={width} />}
          // ListHeaderComponent={() => (
          //   // <TabTitle scrollY={scrollY.value} text="Cookbook" />
          // )}
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
});
