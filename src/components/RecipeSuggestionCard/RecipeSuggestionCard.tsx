import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
} from "react-native-reanimated";
import { Card } from "./Constants";
import { Recipe } from "@/src/constants/Recipe";

interface CardViewProps {
  card: Recipe;
  index: number;
  totalCards: number;
  panHandlers: any;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  nextCardScale: SharedValue<number>;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ROTATION_RANGE = 15;

export default function CardView(props: CardViewProps) {
  const {
    card,
    index,
    totalCards,
    panHandlers,
    translateX,
    translateY,
    nextCardScale,
  } = props;

  const isTopCard = index === 0;
  const isSecondCard = index === 1;

  const leftOffset = useSharedValue(0);
  const cardScale = useSharedValue(isTopCard ? 1 : isSecondCard ? 0.9 : 0.8);
  const cardOpacity = useSharedValue(isTopCard ? 1 : isSecondCard ? 0.9 : 0.8);

  useEffect(() => {
    const targetOffset = isTopCard ? 10 : -25;
    leftOffset.value = withTiming(targetOffset, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
  }, [index, isTopCard]);

  useEffect(() => {
    const targetScale = isTopCard ? 1 : isSecondCard ? 0.8 : 0.7;
    cardScale.value = withTiming(targetScale, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });

    const targetOpacity = isTopCard ? 1 : isSecondCard ? 0.9 : 0;
    cardOpacity.value = withTiming(targetOpacity, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
  }, [index, isTopCard, isSecondCard]);

  const animationStyle = useAnimatedStyle(() => {
    const currentX = isTopCard ? translateX.value : 0;
    const currentY = isTopCard ? translateY.value : 0;

    const rotate = interpolate(
      currentX,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-ROTATION_RANGE, 0, ROTATION_RANGE],
      Extrapolation.CLAMP
    );

    const swipeDistance = Math.sqrt(currentX ** 2 + currentY ** 2);

    const opacity = interpolate(
      swipeDistance,
      [0, SCREEN_WIDTH * 0.5],
      [1, 0],
      Extrapolation.CLAMP
    );

    const scale = isTopCard ? 1 : isSecondCard ? nextCardScale.value : 0.8;

    return {
      transform: [
        { translateX: currentX + leftOffset.value },
        { translateY: currentY },
        { rotate: `${rotate}deg` },
        { scale },
      ],
      opacity: isTopCard ? opacity : cardOpacity.value,
      zIndex: totalCards - index,
    };
  });

  return (
    <Animated.View style={[styles.card, animationStyle]} {...panHandlers}>
      <View style={styles.content}>
        <Text style={styles.title}>{card.name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {card.description}
        </Text>
        <View style={styles.metaContainer}></View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    fontSize: 14,
    color: "#888",
  },
});
