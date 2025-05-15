import { Link } from "expo-router";
import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";

interface RecipeCardProps {
  item: any;
  width: number;
  index: number;
}

const RecipeCard: FC<RecipeCardProps> = ({ item, width, index }) => {
  const cardWidth = (width - 30) / 2;
  const duration = 800;

  return (
    <Link href={`/(app)/(cookbook)/details`} asChild>
      <TouchableOpacity>
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

          {/* Tag Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 8,
              paddingTop: 6,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>
              REAL SIMPLE
            </Text>
            <Text style={{ fontSize: 12, color: "#555" }}>RECIPE</Text>
          </View>

          <Text style={styles.recipeTitle} numberOfLines={2}>
            {item.name || "Recipe Title Placeholder"}
          </Text>

          <View style={styles.footer}>
            <Text style={{ fontSize: 12, color: "#555" }}>20m</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
