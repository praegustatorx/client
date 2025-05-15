import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const AnalyzingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("@/assets/animations/Analyzing.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.text}>Analyzing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
    marginTop: 20,
  },
});

export default AnalyzingOverlay;
