import Colors from "@/src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

const InputRow = ({ value, onChangeText, placeholder, onAdd }: any) => (
  <View className="flex-row items-center gap-2 mb-2">
    <TextInput
      style={styles.messageInput}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
    <TouchableOpacity onPress={onAdd}>
      <AntDesign name="plussquare" size={30} color={Colors.light.tint} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
export default InputRow;
