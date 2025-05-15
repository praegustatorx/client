import { type FC } from "react";
import { View } from "react-native";
import BaseChildButton from "./BaseChildButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Link, router } from "expo-router";

interface ManualInsertSideButtonProps {
  translateYManualInsert: SharedValue<number>;
  TRANSLATE_Y: number;
}

const ManualInsertSideButton: FC<ManualInsertSideButtonProps> = (props) => {
  const { TRANSLATE_Y, translateYManualInsert: translateYManualInsert } = props;
  const ManualInsertStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateYManualInsert.value,
            [TRANSLATE_Y, 0],
            [20, 0]
          ),
        },
        { translateX: translateYManualInsert.value },
        {
          scale: interpolate(
            translateYManualInsert.value,
            [TRANSLATE_Y, 0],
            [1, 0]
          ),
        },
      ],
    };
  });

  const handlePress = () => {
    router.push("/modal");
  };

  return (
    <Link href={`/modal`} asChild>
      <BaseChildButton
        animatedStyle={ManualInsertStyles}
        handlePress={handlePress}
      >
        <MaterialCommunityIcons name="pen" size={28} color="white" />
      </BaseChildButton>
    </Link>
  );
};
export default ManualInsertSideButton;
