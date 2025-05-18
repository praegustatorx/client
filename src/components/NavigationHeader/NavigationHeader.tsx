import { Text } from "@/src/components/Themed";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import TabTitle from "../Shared/TabTitle";

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
      <TabTitle text={title} />
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
    height: 70,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#f3f3f3",

    // Light bottom border
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,

    // Rounded bottom corners
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,

    // Bottom-only shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 }, // Only downward
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
