import React from "react";
import { useColorScheme } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  TSpan,
} from "react-native-svg";

import { greenTint } from "@/src/constants/Colors";

interface TitleProps {
  title: string;
  size: number;
  weight: number;
}

const Title = (props: TitleProps) => {
  const colorScheme = useColorScheme();

  const gradientColors =
    colorScheme === "light" ? ["#000", greenTint] : ["#FFF", greenTint];

  return (
    <Svg height="40" width="100%" viewBox="20 0 300 40">
      <Defs>
        <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={gradientColors[0]} stopOpacity="1" />
          <Stop offset="100%" stopColor={gradientColors[1]} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad1)"
        fontSize={props.size}
        fontWeight={props.weight}
        x="0"
        y="30"
      >
        <TSpan>{props.title}</TSpan>
      </SvgText>
    </Svg>
  );
};

export default Title;
