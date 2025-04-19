import { View, Text as StyledText, Feather } from "@/src/components/Themed";
import { Alert, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "@/src/components/ChatMessage";
import NoChatMessagesView from "@/src/components/NoChatMessagesView";
import { FlashList } from "@shopify/flash-list";
import { Message } from "@/src/utils/Interfaces";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Colors from "../constants/Colors";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ChatMessagesProps {
  messages: Message[];
  height: number;
  onLayout: (event: any) => void;
}

const ChatFeed = ({ messages, height, onLayout }: ChatMessagesProps) => {
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const translateY = useSharedValue(100);
  const chatRef = useRef<FlashList<any>>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollToEnd({ animated: true });
    setShowScrollToBottom(false);
  };

  useEffect(() => {
    translateY.value = withTiming(showScrollToBottom ? 0 : 100, {
      duration: 300,
    });
  }, [showScrollToBottom]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: Colors.light.tint,
    transform: [{ translateY: translateY.value }],
    opacity: withTiming(showScrollToBottom ? 1 : 0, { duration: 300 }),
  }));

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    const isAtBottom = offsetY + layoutHeight >= contentHeight - 20;
    setShowScrollToBottom(!isAtBottom);
  };

  return (
    <View className="flex-1" onLayout={onLayout}>
      {messages.length === 0 && <NoChatMessagesView height={height} />}

      {messages.length > 0 && (
        <FlashList
          data={messages}
          ref={chatRef}
          estimatedItemSize={400}
          renderItem={({ item, index }) => (
            <ChatMessage message={item} hasBackground={index % 2 === 0} />
          )}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
        />
      )}

      <AnimatedTouchable
        onPress={scrollToBottom}
        className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg`}
        style={animatedStyle}
      >
        <Feather name="chevrons-down" size={24} color="white" />
      </AnimatedTouchable>
    </View>
  );
};

export default ChatFeed;
