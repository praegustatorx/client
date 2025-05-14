import { Pressable, View, StyleSheet } from "react-native";
import FieldInput from "./FieldInput";
import { useState } from "react";
import CustomModal from "../Modal/CustomModal";
import UnitPicker from "../Pickers/UnitPicker";
import { Text } from "../Themed";
interface QuantityFieldProps {
  setSelectedUnit: (value: string) => void;
  selectedUnit: string;
  value: string | undefined;
  setValue: any;
  label: string;
  isOptional?: boolean;
}

const FieldInputWithUnitControl = ({
  selectedUnit,
  label,
  setSelectedUnit,
  setValue,
  value,
  isOptional,
}: QuantityFieldProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View className="flex flex-row">
      <View style={styles.quantityWrapper}>
        <FieldInput
          label={label}
          onChangeText={setValue}
          value={value}
          placeholder="e.g 300"
          keyboardType="number-pad"
          isOptional={isOptional}
        />
      </View>

      <View style={styles.unitWrapper}>
        <Text style={styles.label}>Unit</Text>
        <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={styles.value}>{selectedUnit}</Text>
        </Pressable>
      </View>
      <CustomModal
        setVisible={setModalVisible}
        visible={modalVisible}
        appearance="middle"
        modalTitle="Choose an unit of measurement"
      >
        <UnitPicker unit={selectedUnit} setUnit={setSelectedUnit} />
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityWrapper: {
    flex: 0.7,
  },

  unitWrapper: {
    marginVertical: 10,
    flex: 0.3,
    marginLeft: 10,
  },
  label: {
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  value: {
    color: "#333",
  },
});

export default FieldInputWithUnitControl;
