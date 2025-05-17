import { useMutation } from "@tanstack/react-query";
import * as api from "../../api/api";
import { Ingredient } from "@/src/constants/Pantry";
import { PantryItemInput, ErrorResponse } from "../../api/api";

export const usePutItemIngredientMutation = () => {
  return useMutation<any, ErrorResponse, any>({
    mutationFn: api.putIngredientInPantry,
  });
};
