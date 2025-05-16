import { useCallback, useRef, useState } from "react";
import { View, Text } from "../Themed";
import {
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import CardView from "./RecipeSuggestionCard";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { dummyCards, Card } from "./Constants";
import { useAddRecipeMutation } from "@/src/hooks/mutations/useAddRecipeMutations";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { Recipe } from "@/src/constants/Recipe";
import { useNotificationToast } from "@/src/providers/ToastContext";
import { Redirect } from "expo-router";
import { useRecipeCardsContext } from "@/src/providers/RecipeCardsContext";
import { useQueryClient } from "react-query";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
const RESET_DURATION = 300;

const RecipeSuggestionsCard = () => {
  const { user } = useSession();
  const { mutate } = useAddRecipeMutation(user!.email);
  const { showToast } = useNotificationToast();
  const { recipeCards: cards, setRecipeCards } = useRecipeCardsContext();
  const queryClient = useQueryClient();
  if (!cards) {
    return;
  }

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const dummyTranslate = useSharedValue(0);
  const nextCardScale = useSharedValue(0.9);

  const resetPosition = useCallback(() => {
    translateX.value = withTiming(0, { duration: RESET_DURATION });
    translateY.value = withTiming(0, { duration: RESET_DURATION });
    nextCardScale.value = withTiming(0.9, { duration: RESET_DURATION });
  }, []);

  const onSwipeComplete = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      const action =
        direction === "right" || direction == "up" ? "LIKED" : "DISLIKED";

      if (action === "LIKED") {
        console.log("action", action, cards[0]);
        mutate(
          { ...cards[0], tags: [] },
          {
            onSuccess: () => {
              showToast({ message: "", title: "Recipe added to cookbook!" });
              queryClient.invalidateQueries("cookbook");
            },
          }
        );
      }

      if (cards.length > 0) {
        setRecipeCards((pre) => pre.slice(1));
        translateX.value = 0;
        translateY.value = 0;

        nextCardScale.value = 0.8;
        nextCardScale.value = withDelay(
          100,
          withTiming(0.9, { duration: 400, easing: Easing.exp })
        );
      } else {
        resetPosition();
      }
    },
    [cards, resetPosition]
  );

  const forceSwipe = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      const swipeConfig = {
        right: { x: SCREEN_WIDTH * 1.5, y: 0 },
        left: { x: -SCREEN_WIDTH * 1.5, y: 0 },
        up: { x: 0, y: -SCREEN_HEIGHT * 1.5 },
        down: { x: 0, y: SCREEN_HEIGHT * 1.5 },
      };

      translateX.value = withTiming(swipeConfig[direction].x, {
        duration: SWIPE_OUT_DURATION,
      });

      translateY.value = withTiming(
        swipeConfig[direction].y,
        {
          duration: SWIPE_OUT_DURATION,
        },
        () => runOnJS(onSwipeComplete)(direction)
      );
    },
    [onSwipeComplete]
  );

  const handleLike = useCallback(() => {
    forceSwipe("right");
  }, [forceSwipe]);

  const handleDislike = useCallback(() => {
    forceSwipe("left");
  }, [forceSwipe]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        translateX.value = gesture.dx;
        translateY.value = gesture.dy;

        const dragDistance = Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2);
        const progress = Math.min(dragDistance / SWIPE_THRESHOLD, 1);
        nextCardScale.value = 0.9 + 0.1 * progress;
      },
      onPanResponderRelease: (_, gesture) => {
        const absDx = Math.abs(gesture.dx);
        const absDy = Math.abs(gesture.dy);

        if (absDy > absDx) {
          if (gesture.dy < -SWIPE_THRESHOLD) {
            forceSwipe("up");
          } else if (gesture.dy > SWIPE_THRESHOLD) {
            forceSwipe("down");
          } else {
            resetPosition();
          }
        } else {
          if (gesture.dx > -SWIPE_THRESHOLD) {
            forceSwipe("right");
          } else if (gesture.dx < SWIPE_THRESHOLD) {
            forceSwipe("left");
          } else {
            resetPosition();
          }
        }
      },
    })
  ).current;

  const cardRenderer = useCallback(
    (card: Recipe, index: number) => {
      return (
        <CardView
          key={index}
          card={card}
          index={index}
          totalCards={cards.length}
          panHandlers={index === 0 ? panResponder.panHandlers : {}}
          nextCardScale={index === 1 ? nextCardScale : dummyTranslate}
          translateX={index === 0 ? translateX : dummyTranslate}
          translateY={index === 0 ? translateY : dummyTranslate}
        />
      );
    },
    [
      cards.length,
      panResponder.panHandlers,
      translateX,
      translateY,
      nextCardScale,
    ]
  );

  if (cards?.length === 0) {
    return <Redirect href={"/(app)/(tabs)"} />;
  }

  return (
    <View style={styles.cotntainer}>
      {cards.map(cardRenderer).reverse()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleDislike}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLike}>
          <AntDesign name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cotntainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "none",
    justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default RecipeSuggestionsCard;
