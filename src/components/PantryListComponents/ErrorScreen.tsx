import React from "react";
import { SafeAreaView, Text, Image, StyleSheet } from "react-native";

export default function ErrorScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@/assets/images/server-down.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
      <Text style={styles.tryAgainText}>Please try again later.</Text>
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
    width: 300,
    height: 300,
  },
  errorText: {
    marginTop: 10,
    fontSize: 20,
    color: "#6B7280", // gray-500
    fontWeight: "bold",
    textAlign: "center",
  },
  tryAgainText: {
    marginTop: 10,
    fontSize: 15,
    color: "#6B7280", // gray-500
    textAlign: "center",
  },
});
