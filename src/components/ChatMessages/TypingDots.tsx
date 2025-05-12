import { StyleSheet } from "react-native";
import { type FC, useState, useEffect } from "react";
import { Text } from "../Themed";

const TypingDots: FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.text}>{dots}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontSize: 28,
  },
});
export default TypingDots;
