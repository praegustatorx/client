import { useMutation } from "@tanstack/react-query";
import * as api from "../../api/api";
import { ErrorResponse } from "../../api/api";

export const useRegisterMutation = () => {
  return useMutation<
    api.RegisterCredentials,
    ErrorResponse,
    api.RegisterCredentials
  >({
    mutationFn: api.register,
  });
};
