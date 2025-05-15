import { useMutation } from "react-query";
import * as api from "../../api/api";

export const usePicturePredictionMutation = () => {
  return useMutation(api.uploadImageToBePredicted);
};
