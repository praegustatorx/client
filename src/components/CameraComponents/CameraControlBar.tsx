import { type FC } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Shutter from "./CameraButtons/Shutter";
import CameraButton from "./CameraButtons/CameraButton";

interface CameraControlBarProps {
  takeAPhoto: () => void;
  onShutter: () => void;
}

const CameraControlBar: FC<CameraControlBarProps> = (props) => {
  const { takeAPhoto, onShutter } = props;
  return (
    <View
      className="w-full flex-row justify-around items-center"
      testID="camera-control-bar"
    >
      <CameraButton
        Icon={<MaterialIcons name="cancel" size={40} color="white" />}
        onPress={() => router.back()}
      />
      <Shutter onPress={takeAPhoto} />
      <CameraButton
        Icon={
          <MaterialCommunityIcons
            name="image-multiple"
            size={40}
            color="white"
          />
        }
        onPress={async () => {
          await onShutter();
        }}
      />
    </View>
  );
};
export default CameraControlBar;
