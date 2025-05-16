import { useMutation } from "react-query";
import * as api from "../../api/api";

export const useDeleteRecipeFromCookbook = () => {
  return useMutation({
    mutationFn: ({ recipeId, userId }: { recipeId: string; userId: string }) =>
      api.deleteRecipeFromCookbook(recipeId, userId),
  });
};
