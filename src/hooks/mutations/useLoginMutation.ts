import { useMutation } from "react-query";
import * as api from "../../api/api";
export const useLoginMutation = () => {
  return useMutation<api.LoginResponse, Error, api.LoginCredentials>(api.login);
};
