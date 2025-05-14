import { useMutation } from "react-query";
import * as api from "../../api/api";
import { Ingredient } from "@/src/constants/Pantry";

export const usePutItemIngredientMutation = () => {
  return useMutation<any, Error, any>(api.putIngredientInPantry);
};
