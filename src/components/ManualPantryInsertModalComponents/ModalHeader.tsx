import {
  Pressable,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

interface ModalHeaderProps {
  onSave: () => void;
  isSaveDisabled: boolean;
}

const ModalHeader = ({ onSave, isSaveDisabled }: ModalHeaderProps) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.close}>× </Text>
      </Pressable>
      <TouchableOpacity onPress={onSave} disabled={isSaveDisabled}>
        <Text style={[styles.save, isSaveDisabled && styles.saveDisabled]}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  close: {
    fontSize: 28,
  },
  save: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    textAlign: "center",
  },
  saveDisabled: {
    opacity: 0.3,
  },
});
export default ModalHeader;
