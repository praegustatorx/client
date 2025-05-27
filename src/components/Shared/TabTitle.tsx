import { View } from "react-native";
import { Text } from "../Themed";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { FC } from "react";
import Title from "../Title";

interface TabTitle {
  text: string;
}

const TabTitle: FC<TabTitle> = (props) => {
  return <Title size={40} title={props.text} weight={900} />;
};
export default TabTitle;
