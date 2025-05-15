import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RecipeActionButton from "../RecipeActionButton";

const Delete = () => {
  return (
    <RecipeActionButton action="Delete">
      <MaterialIcons name="delete-forever" size={24} color="red" />
    </RecipeActionButton>
  );
};
export default Delete;
