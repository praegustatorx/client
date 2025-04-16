import { BlurView } from "expo-blur";
import { useState, type FC } from "react";
import { View } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Feather } from "./Themed";

interface MessageInputProps {
  onShouldSend: (message: string) => void;
}

const MessageInput: FC<MessageInputProps> = ({ onShouldSend }) => {
  const [message, setMessage] = useState<string>("");
  const insets = useSafeAreaInsets();
  const expanded = useSharedValue(0);

  const onSend = () => {
    //send the message
    setMessage("");
  };
  return (
    <BlurView
      intensity={75}
      style={{
        paddingBottom: 10,
        paddingTop: 10,
      }}
      tint="extraLight"
    >
      <View className="w-full h-full bg">
        <View style={styles.row}>
          <TextInput
            style={styles.messageInput}
            multiline
            autoFocus
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            onPress={onSend}
            className="opacity-100 disabled:opacity-10"
            disabled={message.length === 0}
          >
            <Feather name="send" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: "#b4b4b4",
    backgroundColor: Colors.light.background,
  },
});
export default MessageInput;
