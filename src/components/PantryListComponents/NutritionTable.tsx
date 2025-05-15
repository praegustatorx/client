import { View, Text, StyleSheet } from "react-native";

interface NutritionProps {
  portion: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

const NutritionTable = ({
  portion,
  calories,
  protein,
  fat,
  carbohydrates,
}: NutritionProps) => {
  const entries = [
    { label: "Portion", value: portion },
    { label: "Calories", value: calories },
    { label: "Protein", value: protein },
    { label: "Fat", value: fat },
    { label: "Carbohydrates", value: carbohydrates },
  ];

  return (
    <View>
      {entries.map(({ label, value }) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default NutritionTable;
