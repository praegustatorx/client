import { Role } from "@/src/utils/Interfaces";
import { FC } from "react";
import UserIcon from "./UserIcon";
import AssistantIcon from "./AssistantIcon";

interface MessageIconProps {
  role: Role;
}

const MessageIcon: FC<MessageIconProps> = (props) => {
  const { role } = props;
  return <>{role === "User" ? <UserIcon /> : <AssistantIcon />}</>;
};
export default MessageIcon;
