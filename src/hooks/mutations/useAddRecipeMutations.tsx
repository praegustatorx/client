// hooks/useAddRecipe.ts
import { useMutation } from "react-query";
import { addRecipe, RecipePayload } from "@/src/api/api";
export const useAddRecipeMutation = (userId: string) => {
  return useMutation({
    mutationFn: (data: RecipePayload) => addRecipe(userId, data),
  });
};
