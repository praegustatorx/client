import { View } from "react-native";
import { Text } from "../Themed";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { FC } from "react";

interface TabTitle {
  scrollY: number;
  text: string;
}

const TabTitle: FC<TabTitle> = (props) => {
  const { scrollY, text } = props;

  const pullDownStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY,
      [-100, 0],
      [1.2, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });
  return (
    <View
      style={{
        alignItems: "flex-start",
        paddingBottom: 10,
        paddingHorizontal: 15,
      }}
    >
      <Animated.View style={[{ alignItems: "center" }, pullDownStyle]}>
        <Text className="text-4xl font-extrabold text-center">{text}</Text>
      </Animated.View>
    </View>
  );
};
export default TabTitle;
