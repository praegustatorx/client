import { View } from "@/src/components/Themed";
import { Alert, Platform, SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useEffect, useRef, useState } from "react";
import MessageInput from "@/src/components/MessageInput";
import { dummyMessages } from "@/src/utils/dummyMessages";
import { Message } from "@/src/utils/Interfaces";
import { FlashList } from "@shopify/flash-list";
import { useSendMessageMutation } from "@/src/hooks/mutations/useChatbotMutation";
import { ErrorResponse } from "@/src/api/api";
import ChatFeed from "@/src/components/ChatFeed";

const ChatScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [height, setHeight] = useState(0);
  const ask = useSendMessageMutation();

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const chatId = "TestUser";
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

    const userMessage: Message = {
      role: "User",
      content: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Get chatbot response
      const response = await askChatbot(inputText);

      // Add chatbot response
      const botMessage: Message = {
        role: "Assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to get chatbot response:", error);
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
