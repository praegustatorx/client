import { Message, MessageType, Role } from "./Interfaces";

export const createPendingMessage = (role: Role, content?: string): Message => {
  return {
    role: role,
    content: content ? content : "",
    timestamp: new Date().toISOString(),
    status: "Pending",
  };
};

export const createConfirmedMessage = (
  role: Role,
  content?: string
): Message => {
  return {
    role: role,
    content: content ? content : "",
    timestamp: new Date().toISOString(),
    status: "Sent",
  };
};
export const createFailedMessage = (role: Role, content?: string): Message => {
  return {
    role: role,
    content: content ? content : "",
    timestamp: new Date().toISOString(),
    status: "Failed",
  };
};

export const replacePendingMessageWithResult = (
    prevMessages: Message[], 
    pendingMessage: Message, 
    newMessage: Message
  ) => {
    return prevMessages
      .filter((msg) => msg.timestamp !== pendingMessage.timestamp)
      .concat(newMessage);
  };
  
