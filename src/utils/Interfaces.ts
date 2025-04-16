export type Role = "User" | "Assistant" | "System";
export type MessageType = any; //for now

export interface Message {
  role: Role;
  content: string;
  image?: string;
  timestamp: string;
  prompt?: string;
  type?: MessageType;
}
