import { TouchableOpacity } from "react-native";
import { ReactNode, type FC } from "react";

interface CameraButtonProps {
  onPress: () => void;
  Icon: ReactNode;
}

const CameraButton: FC<CameraButtonProps> = (props) => {
  const { onPress, Icon } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center"
      testID="flash-toggle-button"
    >
      {Icon}
    </TouchableOpacity>
  );
};
export default CameraButton;
