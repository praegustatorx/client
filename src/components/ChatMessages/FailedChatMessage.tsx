import { View, Text, StyleSheet } from "react-native";
import { Feather } from "../Themed";
import UserIcon from "./UserIcon";
import AssistantIcon from "./AssistantIcon";
import { Role } from "@/src/utils/Interfaces";
import { FC } from "react";
import { errorColour } from "@/src/constants/Colors";
import MessageIcon from "./MessageIcon";

interface FailedChatMessageProps {
  role: Role;
}

const FailedChatMessage: FC<FailedChatMessageProps> = (props) => {
  const { role } = props;
  return (
    <View style={styles.containter}>
      <MessageIcon role={role} />
      <View style={styles.content}>
        <Feather name="alert-circle" size={20} color="red" />
        <Text style={styles.text}>Failed to send message.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containter: {
    backgroundColor: errorColour,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 8,
    marginVertical: 10,
  },
  text: {
    fontSize: 17,
  },
});
export default FailedChatMessage;
