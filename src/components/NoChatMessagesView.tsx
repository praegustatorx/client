import { Text } from "./Themed";
import { View, StyleSheet } from "react-native";
import { type FC } from "react";

interface NoChatMessagesViewProps {
  height: number;
}

const NoChatMessagesView: FC<NoChatMessagesViewProps> = ({ height }) => {
  return (
    <View style={[styles.container, { marginTop: height / 2 - 100 }]}>
      <Text className="text-lg">No messages yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default NoChatMessagesView;
