import { type FC } from "react";
import { View } from "react-native";
import BaseChildButton from "./BaseChildButton";
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface CameraSideButtonProps {
  translateYCamera: SharedValue<number>;
  TRANSLATE_Y: number;
}

const CameraChildButton: FC<CameraSideButtonProps> = (props) => {
  const { translateYCamera, TRANSLATE_Y } = props;
  const CameraAnimateStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateYCamera.value },
        {
          scale: interpolate(translateYCamera.value, [TRANSLATE_Y, 0], [1, 0]),
        },
      ],
    };
  });

  return (
    <BaseChildButton
      animatedStyle={CameraAnimateStyles}
      handlePress={() => {
        router.push({
          pathname: "/(app)/(camera)",
          params: {
            mode: "pantry",
          },
        });
      }}
    >
      <AntDesign name="camera" size={28} color="white" />
    </BaseChildButton>
  );
};
export default CameraChildButton;
