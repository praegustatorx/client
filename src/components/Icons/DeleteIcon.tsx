import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "./IconProps";

const DeleteIcon = ({ size, color }: IconProps) => {
  return <Ionicons name="trash-outline" size={size} color="#ff6b6b" />;
};
export default DeleteIcon;
