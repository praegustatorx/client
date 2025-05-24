import { TouchableOpacity } from "react-native";
import { ReactNode, type FC } from "react";
import { Text } from "react-native";

interface CameraImagePreviewButtonProps {
  onPress: () => void;
  icon: ReactNode;
  label: string;
  testId?: string;
}

const CameraImagePreviewButton: FC<CameraImagePreviewButtonProps> = (props) => {
  const { onPress, icon, label, testId } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center"
      testID={testId}
    >
      {icon}
      <Text className="text-white font-semibold mt-2 text-xl">{label}</Text>
    </TouchableOpacity>
  );
};
export default CameraImagePreviewButton;
