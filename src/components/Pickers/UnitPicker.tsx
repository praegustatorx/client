import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Unit } from "@/src/constants/Pantry";
import { units } from "@/src/utils/Units";
interface UnitPickerProps {
  unit: string;
  setUnit: (value: string) => void;
}

const UnitPicker = (props: UnitPickerProps) => {
  const { unit, setUnit } = props;

  return (
    <View>
      <Picker
        selectedValue={unit}
        onValueChange={(itemValue: string) => setUnit(itemValue)}
      >
        {units.map((unit) => (
          <Picker.Item label={unit.value} value={unit.value} key={unit.label} />
        ))}
      </Picker>
    </View>
  );
};

export default UnitPicker;
