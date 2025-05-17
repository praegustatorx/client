import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/src/constants/Colors";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { useNotificationToast } from "@/src/providers/ToastContext";
type Props = {
  onSubmit: (name: string, description: string) => void;
};

const DietModal = ({ onSubmit }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    console.log("press");
    if (name.trim()) {
      onSubmit(name.trim(), description.trim());
      setModalVisible(false);
      setName("");
      setDescription("");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.dropdown}>
        <Text style={styles.label}>Add a diet</Text>
        <AntDesign name="plussquare" size={24} color={Colors.light.tint} />
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setModalVisible(false)}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add a Custom Diet</Text>

                <TextInput
                  placeholder="Diet name"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />

                <TextInput
                  placeholder="Description"
                  style={styles.descriptionInput}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Pressable>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#FAFAFA",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default DietModal;
