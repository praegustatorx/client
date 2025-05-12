// src/components/AnimatedHeader.tsx
import { Text } from "@/src/components/Themed";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";

type NavigationHeaderProps = {
  scrollY: SharedValue<number>;
  title: string;
};

export default function NavigationHeader({
  scrollY,
  title,
}: NavigationHeaderProps) {
  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 80],
      [-90, 0],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [0, 80],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.header, headerStyle]}
    >
      <StatusBar translucent={false} />
      <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
      <Text className="text-3xl font-semibold text-white z-10">{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 50,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,

    shadowColor: "#000",

    elevation: 4,
  },
});
