export type Role = "User" | "Assistant" | "System";
type MessageStatus = "Pending" | "Sent" | "Failed";
export type MessageType = any; //for now

export interface Message {
  role: Role;
  content: string;
  image?: string;
  timestamp?: string;
  prompt?: string;
  type?: MessageType;
  status?: MessageStatus;
}
