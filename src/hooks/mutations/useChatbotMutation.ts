import { useMutation } from "react-query";
import * as api from "../../api/api";
import { ErrorResponse } from "../../api/api";

export const useSendMessageMutation = () => {
  return useMutation<api.MessageResponse, ErrorResponse, api.SendMessage>(
    api.sendMessage,
    {}
  );
};
