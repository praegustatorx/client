import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";

export default function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="green" />
      <Text style={styles.messageFirstLine}>Just a moment…</Text>
      <Text style={styles.messageSecondLine}>
        We’re getting things ready for you!
      </Text>
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
  messageFirstLine: {
    marginTop: 16,
    fontSize: 20,
    color: "#4B5563", // gray-700
    textAlign: "center",
  },
  messageSecondLine: {
    marginTop: 16,
    fontSize: 15,
    color: "#4B5563", // gray-700
    textAlign: "center",
  },
});
