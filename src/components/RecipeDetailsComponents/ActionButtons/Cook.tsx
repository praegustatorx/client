import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RecipeActionButton from "../RecipeActionButton";
const Cook = () => {
  return (
    <RecipeActionButton action="Cook">
      <MaterialCommunityIcons name="chef-hat" size={24} color="black" />
    </RecipeActionButton>
  );
};
export default Cook;
