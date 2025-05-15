import { useMutation } from "react-query";
import * as api from "../../api/api";

export const useDeletePantryIngredient = () => {
  return useMutation<
    api.MessageResponse,
    Error,
    { userId: string; pantryItemId: string }
  >(api.deleteIngredientFromPantry);
};
