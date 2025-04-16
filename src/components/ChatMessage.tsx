import { type FC } from "react";
import { Message } from "../utils/Interfaces";
import { Text } from "./Themed";
import { View } from "react-native";
import { Feather } from "./Themed";

interface ChatMessageProps {
  message: Message;
  hasBackground?: boolean;
}
const ChatMessage: FC<ChatMessageProps> = ({ message, hasBackground }) => {
  const ImageComponent = () => {
    if (message.role === "User") {
      return (
        <View className="w-8 h-8">
          <Feather name="user" size={25} />
        </View>
      );
    } else {
      return (
        <View className="w-8 h-8 ">
          <Feather name="aperture" size={25} />
        </View>
      );
    }
  };
  return (
    <View
      className={`flex flex-row items-center px-4 gap-4 my-2 ${
        hasBackground ? "bg-green-200" : "bg-white"
      }`}
    >
      {ImageComponent()}
      <Text className="flex flex-1 flex-wrap p-1 text-lg">
        {message.content}
      </Text>
    </View>
  );
};

export default ChatMessage;
