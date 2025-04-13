import { type FC } from "react";
import { slides } from "./slides";
import { View, FlatList, Animated } from "react-native";
import IntroductionCarouselItem from "./IntroductionCarouselItem";
import useIntroductionCarousel from "./useIntroductionCarousel";

const IntroductionCarousel: FC = () => {
  const { scrollX, slidesRef, viewableItemsChanged, viewConfig, currentIndex } =
    useIntroductionCarousel();

  return (
    <View className="flex-1 h-full justify-center items-center">
      <FlatList
        data={slides}
        renderItem={({ item }) => <IntroductionCarouselItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />
    </View>
  );
};
export default IntroductionCarousel;
