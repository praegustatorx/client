import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { useEffect, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Cook from "@/src/components/RecipeDetailsComponents/ActionButtons/Cook";
import Share from "@/src/components/RecipeDetailsComponents/ActionButtons/Share";
import Delete from "@/src/components/RecipeDetailsComponents/ActionButtons/Delete";
import BackButton from "@/src/components/DetailPageComponents/Shared/BackButton";
import { useRecipeItem } from "@/src/providers/RecipeItemContext";
const HEADER_HEIGHT = 300;

const RecipeDetails = () => {
  const { id } = useLocalSearchParams();
  const { selectedItem } = useRecipeItem();

  const scrollY = useRef(new Animated.Value(0)).current;

  const recipe = {
    id,
    title: "Creamy Mustard Shallot Chicken",
    author: "By Rachel Gurjar",
    time: "45 min",
    servings: "2 servings",
    description:
      "This weeknight one-skillet recipe features creamy mustard chicken breasts in a velvety sauce with Dijon, thyme, and a hint of turmeric.",
    image: "https://via.placeholder.com/500x600.png?text=Recipe+Image",
    ingredients: [
      "2 chicken breasts",
      "2 shallots, sliced",
      "1 tbsp Dijon mustard",
      "1/2 tsp turmeric",
      "1/2 cup heavy cream",
      "Fresh thyme",
      "Salt & pepper to taste",
    ],
    steps: [
      "Heat skillet and sear chicken until golden brown.",
      "Add shallots and sauté until translucent.",
      "Stir in mustard, turmeric, and cream.",
      "Simmer until sauce thickens and chicken is cooked through.",
      "Garnish with fresh thyme and serve.",
      "Heat skillet and sear chicken until golden brown.",
      "Add shallots and sauté until translucent.",
      "Stir in mustard, turmeric, and cream.",
      "Simmer until sauce thickens and chicken is cooked through.",
      "Garnish with fresh thyme and serve.",
      "Heat skillet and sear chicken until golden brown.",
      "Add shallots and sauté until translucent.",
      "Stir in mustard, turmeric, and cream.",
      "Simmer until sauce thickens and chicken is cooked through.",
      "Garnish with fresh thyme and serve.",
      "Heat skillet and sear chicken until golden brown.",
      "Add shallots and sauté until translucent.",
      "Stir in mustard, turmeric, and cream.",
      "Simmer until sauce thickens and chicken is cooked through.",
      "Garnish with fresh thyme and serve.",
    ],
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BackButton />

      {/* Animated image header */}
      <Animated.View
        style={[
          styles.headerImage,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <ImageBackground
          source={require("@/assets/images/recipe_placeholder.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        ></ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ height: HEADER_HEIGHT, paddingHorizontal: 20 }} />

        <Text style={styles.title} id={`recipe-title-${id}`}>
          {selectedItem?.name}
        </Text>

        <View style={styles.actions}>
          <Cook />
          <Share />
          <Delete />
        </View>

        <Text style={styles.description}>{recipe.description}</Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {selectedItem?.ingredients.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item.type}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Steps</Text>
        {selectedItem?.instructions.map((step, index) => (
          <Text key={index} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

RecipeDetails.sharedElements = (route: any) => {
  const { id } = route.params;
  return [`recipe-title-${id}`];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1,
  },
  headerOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  source: {
    fontWeight: "500",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 10,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 30,
    marginTop: 16,
  },
  metaItem: {
    fontSize: 12,
  },
  metaValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
});

export default RecipeDetails;
