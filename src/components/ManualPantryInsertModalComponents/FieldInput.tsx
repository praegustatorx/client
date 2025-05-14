import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "../Themed";

interface FieldInputProps {
  label: string;
  placeholder: string;
  keyboardType: "default" | "number-pad";
  value: string | undefined;
  onChangeText: any;
  isOptional?: boolean;
  highlight?: boolean;
}
const FieldInput = (props: FieldInputProps) => {
  const {
    label,
    placeholder,
    keyboardType,
    value,
    onChangeText,
    isOptional,
    highlight,
  } = props;

  const inputStyle = [
    styles.input,
    highlight && {
      borderColor: "#00C853",
      shadowColor: "#00C853",
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
  ];

  return (
    <View style={styles.row}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>{label}</Text>
        {isOptional && <Text style={{ fontSize: 9 }}> Optional </Text>}
      </View>
      <TextInput
        placeholder={placeholder}
        style={inputStyle}
        keyboardType={keyboardType}
        autoComplete="off"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
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
});
export default FieldInput;
