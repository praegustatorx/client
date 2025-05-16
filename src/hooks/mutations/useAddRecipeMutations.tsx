// hooks/useAddRecipe.ts
import { useMutation } from "react-query";
import { addRecipe } from "@/src/api/api";
import { RecipePayload } from "@/src/constants/Recipe";
export const useAddRecipeMutation = (userId: string) => {
  return useMutation({
    mutationFn: (data: RecipePayload) => addRecipe(userId, data),
  });
};
