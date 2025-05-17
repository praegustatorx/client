import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RecipeActionButton from "../RecipeActionButton";
import { useRecipeItem } from "@/src/providers/RecipeItemContext";
const Delete = () => {
  const { selectedItem } = useRecipeItem();

  return (
    <RecipeActionButton action="Delete">
      <MaterialIcons name="delete-forever" size={24} color="red" />
    </RecipeActionButton>
  );
};
export default Delete;
