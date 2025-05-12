import { type FC } from "react";
import { Text } from "../Themed";
import { slides, type Slide } from "./slides";

import { View, FlatList, useWindowDimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface IntroductionCarouselItemProps {
  item: Slide;
}

const IntroductionCarouselItem: FC<IntroductionCarouselItemProps> = ({
  item,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: 800,
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontWeight: 300,
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
export default IntroductionCarouselItem;
