import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { IconProps } from "./IconProps";

const FailIcon = ({ size, color }: IconProps) => {
  return <MaterialIcons name="error" size={size} color={color} />;
};
export default FailIcon;
