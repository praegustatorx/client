import { View, Text } from "@/src/components/Themed";
import { Platform, SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import MessageInput from "@/src/components/MessageInput";
import useKeyboardHeight from "@/src/hooks/useKeyboardHeight";
import { dummyMessages } from "@/src/utils/dummyMessages";
import ChatMessage from "@/src/components/ChatMessage";
import { Message } from "@/src/utils/Interfaces";
import NoChatMessagesView from "@/src/components/NoChatMessagesView";
import { FlashList } from "@shopify/flash-list";

const ChatScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [height, setHeight] = useState(0);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "orange" }}>
      <View
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "orange",
        }}
      >
        <View className="flex-1" onLayout={onLayout}>
          {messages.length === 0 && <NoChatMessagesView height={height} />}
          {messages.length > 0 && (
            <FlashList
              data={messages}
              estimatedItemSize={400}
              renderItem={({ item, index }) => (
                <ChatMessage
                  message={item}
                  hasBackground={index % 2 === 0} // every other item
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
              keyboardDismissMode="on-drag"
            />
          )}
        </View>
        <KeyboardAvoidingView
          style={{ position: "absolute", bottom: 0, width: "100%", left: 0 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={95}
        >
          <MessageInput onShouldSend={() => {}} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
export default ChatScreen;
