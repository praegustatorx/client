import { AntDesign } from "@expo/vector-icons";
import { FC, ReactNode } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import Colors from "@/src/constants/Colors";
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface BaseChildButtonProps {
  handlePress: () => void;
  animatedStyle: {};
  children: ReactNode;
}

const BaseChildButton: FC<BaseChildButtonProps> = (props) => {
  const { animatedStyle, handlePress, children } = props;
  return (
    <AnimatedTouchable
      style={[styles.button, animatedStyle]}
      onPress={handlePress}
    >
      {children}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    position: "absolute",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
export default BaseChildButton;
