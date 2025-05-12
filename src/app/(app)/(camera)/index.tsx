import {
  CameraView,
  useCameraPermissions,
  FlashMode,
  CameraCapturedPicture,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraImagePreview from "@/src/components/CameraComponents/ImagePreview/CameraImagePreview";
import CameraButton from "@/src/components/CameraComponents/CameraButtons/CameraButton";
import CameraControlBar from "@/src/components/CameraComponents/CameraControlBar";
import * as api from "@/src/api/api";
import { router, useLocalSearchParams } from "expo-router";
import useCamera from "@/src/hooks/useCamera";
import useMediaLibrary from "@/src/hooks/useMediaLibrary";
const CameraScreen = () => {
  const {
    cameraRef,
    flash,
    permission,
    requestPermission,
    takeAphoto,
    toggleFlash,
  } = useCamera();
  const [image, setImage] = useState<
    ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined
  >(undefined);
  const { launchImageLibrary } = useMediaLibrary();

  const { mode, imageUri } = useLocalSearchParams();

  useEffect(() => {
    if (imageUri) {
      setImage({ uri: imageUri } as any);
    }
  }, [imageUri]);

  const onAction = () => {
    const formData = new FormData();
    if (!image) return;

    if ("assetId" in image) {
      formData.append("image", {
        uri: image.uri,
        name: image.fileName,
        type: "image",
      } as any);
    } else {
      formData.append("image", {
        uri: image.uri,
        name: "testing",
        type: "image",
      } as any);
    }

    api.uploadImage(formData);
  };

  const onRetake = () => {
    setImage(undefined);
  };

  const onImageSelection = async () => {
    const image = await launchImageLibrary();

    image && setImage(image);
  };

  const onShutter = async () => {
    const image = await takeAphoto();
    setImage(image);
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center pb-3">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {image ? (
        <CameraImagePreview
          src={image.uri}
          onRetake={onRetake}
          onAction={onAction}
          mode={mode as string}
        />
      ) : (
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
          flash={flash}
          autofocus="on"
          // poster=""`
        >
          <View className="flex items-start">
            <CameraButton Icon={FlashButton(flash)} onPress={toggleFlash} />
          </View>
          <CameraControlBar
            onShutter={onImageSelection}
            takeAPhoto={onShutter}
          />
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});

const FlashButton = (flash: FlashMode) => {
  return flash === "on" ? (
    <Ionicons name={"flash-off"} size={40} color="white" />
  ) : (
    <Ionicons name={"flash"} size={40} color="white" />
  );
};

export default CameraScreen;
