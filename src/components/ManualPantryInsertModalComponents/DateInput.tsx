import { View, Text, TextInput, StyleSheet } from "react-native";
import DatePicker from "../Pickers/DatePicker";
interface FieldInputProps {
  label: string;
  date: Date;
  setDate: (value: Date) => void;
}
const DateInput = (props: FieldInputProps) => {
  return (
    <View style={styles.row}>
      <View style={{ flex: 0.3 }}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={{ flex: 0.7 }}>
        <DatePicker date={props.date} setDate={props.setDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
});
export default DateInput;
