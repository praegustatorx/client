import { View, StyleSheet } from "react-native";
import TypingDots from "./TypingDots";
import { FC } from "react";
import { Role } from "@/src/utils/Interfaces";
import MessageIcon from "./MessageIcon";

interface PendingMessageProps {
  role: Role;
}

const PendingMessage: FC<PendingMessageProps> = (props) => {
  const { role } = props;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MessageIcon role={role} />
        <TypingDots />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    gap: 8,
    marginVertical: 10,
  },
});
export default PendingMessage;
