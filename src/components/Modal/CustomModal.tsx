import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { ReactNode } from "react";
import { BlurView } from "expo-blur";

interface CustomModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
  appearance?: "bottom-sheet" | "middle" | "notification";
  modalTitle?: string;
}

// modal doesnt like native wind aswell, I wonder why do I use it at all.
const CustomModal = ({
  visible,
  setVisible,
  children,
  modalTitle,
  appearance = "bottom-sheet",
}: CustomModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable
        style={styles.overlay}
        onPress={() => {
          setVisible(false);
        }}
      >
        <BlurView
          intensity={50}
          tint={Platform.OS === "ios" ? "light" : "default"}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            styles.modalWrapper,
            appearance === "bottom-sheet" && styles.bottomSheet,
            appearance === "middle" && styles.middle,
            appearance === "notification" && styles.notification,
          ]}
        >
          {modalTitle && <Text style={styles.modalTitle}>{modalTitle}</Text>}
          <Pressable style={styles.modalContent} onPress={() => {}}>
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    width: "90%",
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "white",
  },
});

export default CustomModal;
