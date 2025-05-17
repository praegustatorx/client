import Feather from "@expo/vector-icons/Feather";
import RecipeActionButton from "../RecipeActionButton";
const Share = () => {
  return (
    <RecipeActionButton action="Share">
      <Feather name="share" size={24} color="black" />
    </RecipeActionButton>
  );
};
export default Share;
