import {
  CameraCapturedPicture,
  CameraView,
  FlashMode,
  PermissionResponse,
  useCameraPermissions,
} from "expo-camera";
import { RefObject, useRef, useState } from "react";

type UseCameraReturn = {
  cameraRef: RefObject<CameraView | null>;
  flash: FlashMode;
  takeAphoto: () => Promise<CameraCapturedPicture | undefined>;
  requestPermission: () => void;
  permission: PermissionResponse | null;
  toggleFlash: () => void;
};

const useCamera = (): UseCameraReturn => {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>("off");

  const toggleFlash = () => {
    flash === "on" ? setFlash("off") : setFlash("on");
  };

  const takeAphoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    return photo;
  };

  return {
    cameraRef,
    takeAphoto,
    requestPermission,
    permission,
    toggleFlash,
    flash,
  };
};

export default useCamera;
