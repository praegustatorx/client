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
import { useSession } from "@/src/providers/auth/AuthProvider";
import { router } from "expo-router";
import { useRecipeCardsContext } from "@/src/providers/RecipeCardsContext";

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  const ask = useSendMessageMutation();
  const { setRecipeCards } = useRecipeCardsContext();

  const { user } = useSession();
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const askChatbot = async (message: string) => {
    const response = await ask.mutateAsync(
      { chatId: user?.email!, message },
      {
        onError: (error: ErrorResponse) => {
          Alert.alert("Error", error.message);
        },
      }
    );
    console.log("response", response);

    if (response.text) {
      console.log("text ");
    }

    if (response.json) {
      setRecipeCards(response.json);
      router.replace("/(app)/RecipeSwipe");
      console.log("recipe suggestion");
    }

    return response;
  };

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    const pendingAssistantMessage = createPendingMessage("Assistant");
    const pendingUserMessage = createPendingMessage("User", inputText);

    setMessages((prevMessages) => [...prevMessages, pendingUserMessage]);

    try {
      const result = await askChatbot(inputText);

      if (result.json) {
        setRecipeCards(result.json);
        router.replace("/(app)/RecipeSwipe");
        return;
      }

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
        response.text
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
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ChatFeed height={height} messages={messages} onLayout={onLayout} />
        <MessageInput onShouldSend={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
