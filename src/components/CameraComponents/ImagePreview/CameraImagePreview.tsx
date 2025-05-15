import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import CameraImagePreviewButton from "./CameraImagePreviewButton";

interface CameraImagePreviewType {
  src: string;
  onRetake: () => void;
  onAction: () => void;
  mode: string;
}

const CameraImagePreview: FC<CameraImagePreviewType> = ({
  src,
  onRetake,
  onAction,
  mode,
}) => {
  return (
    <View className="flex flex-1 relative">
      <Image source={{ uri: src }} style={styles.image} contentFit="cover" />
      <View className="flex-row absolute bottom-10 left-0 right-0 gap-8 justify-center">
        {mode === "media-preview-only" ? (
          <CameraImagePreviewButton
            icon={<MaterialIcons name="cancel" size={40} color="white" />}
            onPress={() => router.replace("/(app)/(tabs)")}
            label="Cancel"
          />
        ) : (
          <CameraImagePreviewButton
            icon={
              <MaterialCommunityIcons
                name="camera-retake"
                size={40}
                color="white"
              />
            }
            onPress={onRetake}
            label="Retake"
          />
        )}

        <CameraImagePreviewButton
          icon={<Ionicons name="sparkles" size={40} color="white" />}
          label="Analyze"
          onPress={onAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //image expo also doesnt support native wind, this is becoming annoying as fuck
  image: {
    flex: 1,
  },
});

export default CameraImagePreview;
