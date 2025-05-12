import { useState, type FC } from "react";
import { View } from "react-native";
import BaseChildButton from "./BaseChildButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useMediaLibrary from "@/src/hooks/useMediaLibrary";
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

interface MediaLibraryChildButton {
  translateYMediaLibrary: SharedValue<number>;
  TRANSLATE_Y: number;
}

const MediaLibraryChildButton: FC<MediaLibraryChildButton> = (props) => {
  const { translateYMediaLibrary, TRANSLATE_Y } = props;
  const { launchImageLibrary } = useMediaLibrary();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();

  const onImageSelection = async () => {
    const image = await launchImageLibrary();

    if (image) {
      setImage(image);
      router.replace({
        pathname: "/(app)/(camera)",
        params: { imageUri: image.uri, mode: "media-preview-only" }, // Pass image URI to CameraScreen
      });
    }
  };

  const AnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateYMediaLibrary.value,
            [TRANSLATE_Y, 0],
            [TRANSLATE_Y / 2, 0]
          ),
        },
        {
          translateX: interpolate(
            translateYMediaLibrary.value,
            [TRANSLATE_Y, 0],
            [-50, 0]
          ),
        },
        {
          scale: interpolate(
            translateYMediaLibrary.value,
            [TRANSLATE_Y, 0],
            [1, 0]
          ),
        },
      ],
    };
  });
  return (
    <>
      <BaseChildButton
        animatedStyle={AnimationStyle}
        handlePress={onImageSelection}
      >
        <MaterialCommunityIcons name="image-multiple" size={25} color="white" />
      </BaseChildButton>
    </>
  );
};
export default MediaLibraryChildButton;
