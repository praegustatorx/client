import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

type MessageScreenProps = {
  message: string;
  image: ImageSourcePropType;
};

export default function MessageScreen({ message, image }: MessageScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.messageText}>{message}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  messageText: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280", // gray-500
    textAlign: "center",
  },
});
