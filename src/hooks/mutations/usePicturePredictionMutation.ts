import { useMutation } from "@tanstack/react-query";
import * as api from "../../api/api";
import { ErrorResponse } from "../../api/api";

export const usePicturePredictionMutation = () => {
  return useMutation<any, ErrorResponse, any>({
    mutationFn: api.uploadImageToBePredicted,
  });
};
