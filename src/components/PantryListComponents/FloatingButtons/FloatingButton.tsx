import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import Colors from "@/src/constants/Colors";
import useMediaLibrary from "@/src/hooks/useMediaLibrary";
import CameraChildButton from "./CameraChildButton";
import MediaLibraryChildButton from "./MediaLibraryChildButton";
import ManualInsertSideButton from "./ManualInsertChildButton";

const DURATION = 400;
const TRANSLATE_Y = -80;

const FloatingButton = () => {
  const isOpened = useRef<boolean>(true);
  const translateYCamera = useSharedValue(0);
  const translateYMediaLibrary = useSharedValue(0);
  const translateYManualInsert = useSharedValue(0);

  const handlePress = () => {
    if (isOpened.current) {
      translateYCamera.value = withDelay(
        DURATION,
        withTiming(0, { duration: DURATION })
      );
      translateYMediaLibrary.value = withDelay(
        DURATION / 2,
        withTiming(0, { duration: DURATION })
      );
      translateYManualInsert.value = withTiming(0, { duration: DURATION });
    } else {
      translateYCamera.value = withSpring(TRANSLATE_Y, { damping: 10 });
      translateYMediaLibrary.value = withDelay(
        DURATION / 2,
        withTiming(TRANSLATE_Y, {
          duration: DURATION,
        })
      );

      translateYManualInsert.value = withDelay(
        DURATION,
        withSpring(TRANSLATE_Y, {
          damping: 10,
        })
      );
    }
    isOpened.current = !isOpened.current;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.plusButton} onPress={handlePress}>
        <AntDesign name="plus" size={25} color="white" />
      </TouchableOpacity>
      <CameraChildButton
        TRANSLATE_Y={TRANSLATE_Y}
        translateYCamera={translateYCamera}
      />
      <MediaLibraryChildButton
        TRANSLATE_Y={TRANSLATE_Y}
        translateYMediaLibrary={translateYMediaLibrary}
      />
      <ManualInsertSideButton
        TRANSLATE_Y={TRANSLATE_Y}
        translateYManualInsert={translateYManualInsert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 15,
  },
  plusButton: {
    width: 55,
    height: 55,
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",

    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FloatingButton;
