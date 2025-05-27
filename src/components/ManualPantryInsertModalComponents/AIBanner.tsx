import { View, Text, StyleSheet } from "react-native";

const AIBanner = () => {
  return (
    <View style={styles.aiBanner}>
      <Text style={styles.aiBannerText}>
        Foodie can make mistakes. Check all information.
      </Text>
    </View>
  );
};
export default AIBanner;

const styles = StyleSheet.create({
  aiBanner: {
    backgroundColor: "#E6F4EA", // washed out green
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  aiBannerText: {
    color: "#1B5E20", // dark green text for contrast
    fontSize: 14,
    textAlign: "center",
  },
});
