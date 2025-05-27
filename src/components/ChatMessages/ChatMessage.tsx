import { type FC } from "react";
import { Message } from "../../utils/Interfaces";
import { StyleSheet } from "react-native";
import { Text as StyledText } from "../Themed";
import { Text } from "react-native";
import { View, ActivityIndicator } from "react-native";
import { Feather } from "../Themed";
import FailedChatMessage from "./FailedChatMessage";
import PendingMessage from "./PendingMessage";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const messageStatus = message.status;
  const messageSenderRole = message.role;

  if (messageStatus === "Failed") {
    return <FailedChatMessage role={messageSenderRole} />;
  }

  if (messageStatus === "Pending") {
    return <PendingMessage role={messageSenderRole} />;
  }

  const ImageComponent = () => (
    <View style={styles.image}>
      {message.role === "User" ? (
        <Feather name="user" size={30} />
      ) : (
        <Feather name="aperture" size={30} />
      )}
    </View>
  );

  const renderContent = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {ImageComponent()}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  background: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    gap: 8,
    marginVertical: 10,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    flexShrink: 1,
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    // flexShrink: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
});

export default ChatMessage;
