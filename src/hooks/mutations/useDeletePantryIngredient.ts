import { useMutation } from "@tanstack/react-query";
import * as api from "../../api/api";
import { MessageResponse, ErrorResponse } from "../../api/api";

export const useDeletePantryIngredient = () => {
  return useMutation<
    MessageResponse,
    ErrorResponse,
    { userId: string; pantryItemId: string }
  >({
    mutationFn: api.deleteIngredientFromPantry,
  });
};
