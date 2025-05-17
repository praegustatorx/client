import { Text } from "react-native";
const RecipeActionText = ({ action }: { action: string }) => {
  return <Text style={{ fontWeight: "600" }}>{action}</Text>;
};

export default RecipeActionText;
