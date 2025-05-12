import { useMutation } from "react-query";
import * as api from "../../api/api";

export const usePutItemIngredientMutation = () => {
  return useMutation<any, Error, any>(api.putIngredientInPantry);
};
