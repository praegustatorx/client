import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as useCameraHook from "@/src/hooks/useCamera";
import * as useMediaLibraryHook from "@/src/hooks/useMediaLibrary";
import * as usePredictionHook from "@/src/hooks/mutations/usePicturePredictionMutation";
import { useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, router } from "expo-router";
import { usePredictedItem } from "@/src/providers/PredictedItemContext";
import { useNotificationToast } from "@/src/providers/ToastContext";
import CameraScreen from "../(app)/(camera)";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// ─── Mock External Hooks and APIs ───
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  router: { replace: jest.fn() },
}));

jest.mock("expo-camera", () => ({
  CameraView: ({ children }: any) => <>{children}</>,
  useCameraPermissions: jest.fn(),
  FlashMode: { on: "on", off: "off" },
}));

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  return {
    MaterialIcons: (props: any) => (
      <Text testID={`icon-${props.name}`}>{props.name}</Text>
    ),
    Ionicons: (props: any) => (
      <Text testID={`ion-icon-${props.name}`}>{props.name}</Text>
    ),
    MaterialCommunityIcons: (props: any) => (
      <Text testID={`icon-${props.name}`}>{props.name}</Text>
    ),
  };
});

jest.mock("@/src/hooks/useCamera");
jest.mock("@/src/hooks/useMediaLibrary");
jest.mock("@/src/hooks/mutations/usePicturePredictionMutation");
jest.mock("@/src/providers/PredictedItemContext");
jest.mock("@/src/providers/ToastContext");

describe("CameraScreen - full integration", () => {
  const mockSetPredictedItem = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn(),
    ]);

    (useLocalSearchParams as jest.Mock).mockReturnValue({
      mode: "ai-powered",
      imageUri: null,
    });

    (usePredictedItem as jest.Mock).mockReturnValue({
      setPredictedItem: mockSetPredictedItem,
    });

    (useNotificationToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });

    (useCameraHook.default as jest.Mock).mockReturnValue({
      cameraRef: { current: null },
      flash: "off",
      permission: { granted: true },
      requestPermission: jest.fn(),
      takeAphoto: jest.fn().mockResolvedValue({ uri: "test-camera.jpg" }),
      toggleFlash: jest.fn(),
    });

    (useMediaLibraryHook.default as jest.Mock).mockReturnValue({
      launchImageLibrary: jest.fn().mockResolvedValue({
        uri: "test-gallery.jpg",
        assetId: "123",
        fileName: "photo.jpg",
      }),
    });

    (
      usePredictionHook.usePicturePredictionMutation as jest.Mock
    ).mockReturnValue({
      mutate: jest.fn((formData, { onSuccess }) =>
        onSuccess({
          type: "fruit",
          info: { value: { calories: 200 } },
        })
      ),
      isPending: false,
    });
  });

  it("renders camera controls when no image is selected", () => {
    const { getByTestId } = render(<CameraScreen />);
    expect(getByTestId("camera-screen-root")).toBeTruthy();
    expect(getByTestId("icon-image-multiple")).toBeTruthy();
    expect(getByTestId("shutter-button")).toBeTruthy();
  });

  it("captures a photo and shows image preview", async () => {
    const { getByTestId } = render(<CameraScreen />);
    fireEvent.press(getByTestId("shutter-button"));

    await waitFor(() => {
      expect(getByTestId("action-button")).toBeTruthy();
      expect(getByTestId("retake-button")).toBeTruthy();
    });
  });

  it("submits the captured image and navigates on success", async () => {
    const { getByTestId } = render(<CameraScreen />);
    fireEvent.press(getByTestId("shutter-button"));

    await waitFor(() => getByTestId("action-button"));
    fireEvent.press(getByTestId("action-button"));

    await waitFor(() => {
      expect(
        usePredictionHook.usePicturePredictionMutation().mutate
      ).toHaveBeenCalled();
      expect(mockSetPredictedItem).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith({
        pathname: "/modal",
        params: { mode: "ai-powered" },
      });
    });
  });

  it("handles prediction error gracefully", async () => {
    (
      usePredictionHook.usePicturePredictionMutation as jest.Mock
    ).mockReturnValue({
      mutate: jest.fn((_, { onError }) =>
        onError({ message: "Upload failed" })
      ),
      isPending: false,
    });

    const { getByTestId } = render(<CameraScreen />);
    fireEvent.press(getByTestId("shutter-button"));

    await waitFor(() => getByTestId("action-button"));
    fireEvent.press(getByTestId("action-button"));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        title: "Failed",
        message: "Upload failed",
      });
      expect(router.replace).toHaveBeenCalledWith("/(app)/(tabs)");
    });
  });
});
