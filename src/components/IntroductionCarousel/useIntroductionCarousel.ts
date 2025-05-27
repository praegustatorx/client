import { useRef, useState, useCallback } from "react";
import { FlatList, Animated } from "react-native";
import { slides } from "./slides";
import { useFocusEffect } from "expo-router";

const useIntroductionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const autdoScrollDirectionRef = useRef<"forward" | "backward">("forward");
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    //don't touch the any type here, the stupid compiler wont shut up

    ({ viewableItems }: { viewableItems: any }) => {
      if (viewableItems?.length > 0 && viewableItems[0]?.index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        let nextIndex = currentIndex;

        if (autdoScrollDirectionRef.current === "forward") {
          nextIndex++;
          if (nextIndex >= slides.length) {
            nextIndex = slides.length - 2;
            autdoScrollDirectionRef.current = "backward";
          }
        } else {
          nextIndex--;
          if (nextIndex < 0) {
            nextIndex = 1;
            autdoScrollDirectionRef.current = "forward";
          }
        }

        slidesRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }, 3000);

      return () => clearInterval(interval);
    }, [currentIndex])
  );

  return { scrollX, slidesRef, viewableItemsChanged, viewConfig, currentIndex };
};
export default useIntroductionCarousel;
