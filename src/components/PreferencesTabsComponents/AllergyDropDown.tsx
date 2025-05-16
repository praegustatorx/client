import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { Allergy } from "@/src/constants/Allergy";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/src/constants/Colors";

type Props = {
  value: Allergy | null;
  onChange: (value: Allergy) => void;
  disabledItems?: Allergy[];
};

const AllergyDropdown = ({ value, onChange, disabledItems = [] }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const allergyOptions = Object.values(Allergy);

  const handleSelect = (item: Allergy) => {
    if (!disabledItems.includes(item)) {
      onChange(item);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.dropdown}>
        <Text style={styles.label}>Select an allergy</Text>
        <AntDesign name="plussquare" size={24} color={Colors.light.tint} />
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Allergy</Text>

            <FlatList
              data={allergyOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isDisabled = disabledItems.includes(item);
                return (
                  <Pressable
                    disabled={isDisabled}
                    onPress={() => handleSelect(item)}
                    style={[
                      styles.optionItem,
                      isDisabled && styles.optionItemDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isDisabled && styles.optionTextDisabled,
                      ]}
                    >
                      {item}
                      {isDisabled ? " (Added)" : ""}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontWeight: 600,
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
  dropdownText: {
    fontSize: 16,
  },
  textSelected: {
    color: "#000",
  },
  textPlaceholder: {
    color: "#9CA3AF",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  optionItemDisabled: {
    opacity: 0.6,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  optionTextDisabled: {
    color: "red",
  },
});

export default AllergyDropdown;
