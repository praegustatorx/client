import { Alert, Platform, SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import MessageInput from "@/src/components/MessageInput";
import { Message } from "@/src/utils/Interfaces";
import { useSendMessageMutation } from "@/src/hooks/mutations/useChatbotMutation";
import { ErrorResponse } from "@/src/api/api";
import ChatFeed from "@/src/components/ChatFeed";
import {
  createConfirmedMessage,
  createFailedMessage,
  createPendingMessage,
  replacePendingMessageWithResult,
} from "@/src/utils/chatMessageUtils";

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  const ask = useSendMessageMutation();

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const chatId = "TestUser"; //TODo Replace this with user.
  const askChatbot = async (message: string) => {
    const response = await ask.mutateAsync(
      { chatId, message },
      {
        onError: (error: ErrorResponse) => {
          Alert.alert("Error", error.message);
        },
      }
    );
    return response.message;
  };

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    const pendingAssistantMessage = createPendingMessage("Assistant");
    const pendingUserMessage = createPendingMessage("User", inputText);

    setMessages((prevMessages) => [...prevMessages, pendingUserMessage]);

    try {
      await askChatbot(inputText);

      const confirmedUserMessage = createConfirmedMessage("User", inputText);
      setMessages((prevMessages) =>
        replacePendingMessageWithResult(
          prevMessages,
          pendingUserMessage,
          confirmedUserMessage
        )
      );

      setMessages((prevMessages) => [...prevMessages, pendingAssistantMessage]);
      const response = await askChatbot(inputText);

      const confirmedAssistantMessage = createConfirmedMessage(
        "Assistant",
        response
      );
      setMessages((prevMessages) =>
        replacePendingMessageWithResult(
          prevMessages,
          pendingAssistantMessage,
          confirmedAssistantMessage
        )
      );
    } catch (error) {
      const failedUserMessage = createFailedMessage("User", inputText);
      setMessages((prevMessages) =>
        replacePendingMessageWithResult(
          prevMessages,
          pendingUserMessage,
          failedUserMessage
        )
      );

      const failedAssistantMessage = createFailedMessage("Assistant", "");
      setMessages((prevMessages) =>
        replacePendingMessageWithResult(
          prevMessages,
          pendingAssistantMessage,
          failedAssistantMessage
        )
      );
    }
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={95}
        className="flex-1"
      >
        <ChatFeed height={height} messages={messages} onLayout={onLayout} />
        <MessageInput onShouldSend={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
