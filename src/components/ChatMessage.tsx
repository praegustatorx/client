import { type FC } from "react";
import { Message } from "../utils/Interfaces";
import { Text as StyledText } from "./Themed";
import { Text } from "react-native";
import { View, ActivityIndicator } from "react-native";
import { Feather } from "./Themed";

interface ChatMessageProps {
  message: Message;
  hasBackground?: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, hasBackground }) => {
  const messageStatus = message.status;

  const ImageComponent = () => (
    <View className="w-8 h-8 justify-center items-center">
      {message.role === "User" ? (
        <Feather name="user" size={25} />
      ) : (
        <Feather name="aperture" size={25} />
      )}
    </View>
  );

  const renderContent = () => {
    if (messageStatus === "Pending") {
      return (
        <View className="flex flex-row items-center gap-2">
          <ActivityIndicator size="small" />
          {message.role == "User" && (
            <Text className="flex flex-1 flex-wrap px-1 text-lg text-gray-400">
              {message.content}
            </Text>
          )}
        </View>
      );
    }

    if (messageStatus === "Failed") {
      return (
        <View className="flex flex-row items-center gap-2">
          <Feather name="alert-circle" size={20} color="red" />
          <Text className="text-red-500">Failed to send message.</Text>
        </View>
      );
    }

    return (
      <Text className="flex flex-1 flex-wrap px-1 text-lg">
        {message.content}
      </Text>
    );
  };

  return (
    <View
      className={`flex flex-row items-start pt-1 px-4 gap-4 my-2 ${
        hasBackground ? "bg-green-200" : "bg-white"
      }`}
    >
      {ImageComponent()}
      {renderContent()}
    </View>
  );
};

export default ChatMessage;
