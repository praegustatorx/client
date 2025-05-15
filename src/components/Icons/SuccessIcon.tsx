import { Octicons } from "@expo/vector-icons";
import { IconProps } from "./IconProps";

const SuccessIcon = ({ size, color }: IconProps) => {
  return <Octicons name="check-circle-fill" size={size} color={color} />;
};
export default SuccessIcon;
