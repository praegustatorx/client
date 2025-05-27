import { StyleSheet, View } from "react-native";
import RecipeSuggestionsCard from "@/src/components/RecipeSuggestionCard/RecipeSuggestionsView";

const RecipeSwipe = () => {
  return (
    <View style={styles.container}>
      <RecipeSuggestionsCard />
    </View>
  );
};

export default RecipeSwipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d0f5d8",
  },
});
