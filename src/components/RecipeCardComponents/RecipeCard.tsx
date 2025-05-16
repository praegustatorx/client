import { Link, router } from "expo-router";
import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { Recipe } from "@/src/api/api";
import { useRecipeItem } from "@/src/providers/RecipeItemContext";

interface RecipeCardProps {
  item: Recipe;
  width: number;
  index: number;
}

const RecipeCard: FC<RecipeCardProps> = ({ item, width, index }) => {
  const cardWidth = (width - 30) / 2;
  const duration = 800;
  const { setSelectedItem } = useRecipeItem();

  const handlePress = () => {
    setSelectedItem(item);
    router.push("/(app)/(cookbook)/details");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        entering={
          index % 2 === 0
            ? FadeInLeft.duration(duration)
            : FadeInRight.duration(duration)
        }
        style={[{ width: cardWidth }, styles.container]}
      >
        <Image
          source={require("@/assets/images/recipe_placeholder.png")}
          style={[{ width: cardWidth }, styles.image]}
          contentFit="contain"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingTop: 6,
          }}
        >
          <Text style={{ fontSize: 12, color: "#555" }}>RECIPE</Text>
        </View>

        <Text style={styles.recipeTitle} numberOfLines={2}>
          {item.name || "Recipe Title Placeholder"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "green", // 👈 green glow
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
    minHeight: 260,
  },
  image: {
    height: 200,
    resizeMode: "cover",
  },
  recipeTitle: {
    fontWeight: "600",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingTop: 4,
    lineHeight: 18,
    maxHeight: 20,
    overflow: "hidden",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 6,
    gap: 6,
  },
});

export default RecipeCard;
