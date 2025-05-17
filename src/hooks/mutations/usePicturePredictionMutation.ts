import { useMutation } from "@tanstack/react-query";
import * as api from "../../api/api";
import { Ingredient } from "@/src/constants/Pantry";
import { PantryItemInput, ErrorResponse } from "../../api/api";

export const usePutItemIngredientMutation = () => {
  return useMutation<Ingredient, ErrorResponse, PantryItemInput>({
    mutationFn: api.putIngredientInPantry,
  });
};
