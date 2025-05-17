import { useMutation } from "@tanstack/react-query";
import * as api from "../../api/api";

export const useLoginMutation = () => {
  return useMutation<api.LoginResponse, Error, api.LoginCredentials>({
    mutationFn: (credentials) => api.login(credentials),
  });
};
