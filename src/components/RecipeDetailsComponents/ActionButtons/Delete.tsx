import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RecipeActionButton from "../RecipeActionButton";
import { useRecipeItem } from "@/src/providers/RecipeItemContext";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { useDeleteRecipeFromCookbook } from "@/src/hooks/mutations/useDeleteRecipeFromCookbookMutation";
import { router } from "expo-router";
import { useNotificationToast } from "@/src/providers/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
const Delete = () => {
  const { selectedItem } = useRecipeItem();
  const { user } = useSession();
  const { showToast } = useNotificationToast();
  const client = useQueryClient();
  const { mutate, error } = useDeleteRecipeFromCookbook();

  const handleDelete = () => {
    mutate(
      { recipeId: selectedItem!.id, userId: user!.email },
      {
        onSuccess: () => {
          showToast({
            message: "",
            title: "Recipe removed cookbook",
            duration: 2000,
          });
          client.invalidateQueries({ queryKey: ["cookbook"] });
          router.replace("/(app)/(tabs)/two");
        },
        onError: (err) => {
          showToast({
            message: "Something went wrong. Pleasae try again later.",
            title: "Failed",
            duration: 2000,
          });
        },
      }
    );
  };

  return (
    <RecipeActionButton action="Delete" onClick={handleDelete}>
      <MaterialIcons name="delete-forever" size={24} color="red" />
    </RecipeActionButton>
  );
};
export default Delete;
