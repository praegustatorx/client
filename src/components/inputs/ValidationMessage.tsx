import { type FC } from "react";
import { Feather, Text } from "../Themed";
import Animated from "react-native-reanimated";
import { StyleProp } from "react-native";

interface ValidationMessageProps {
  message: string;
  style: any; //I cant for the life of me figure out the type for this
}

const ValidationMessage: FC<ValidationMessageProps> = ({ message, style }) => {
  return (
    <Animated.View
      style={style}
      className="w-full overflow-hidden rounded-md flex flex-row items-center"
    >
      <Feather name="alert-circle" className="mr-2" />
      <Text testID="email-checker" className="text-white font-extrabold">
        {message}
      </Text>
    </Animated.View>
  );
};
export default ValidationMessage;
