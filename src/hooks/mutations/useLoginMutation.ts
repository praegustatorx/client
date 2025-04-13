import { useMutation } from "react-query";
import * as api from "../../api/api";

type LoginResponse = {
  token: string;
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, api.LoginCredentials>(api.login);
};
