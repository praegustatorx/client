import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ingredient } from "@/src/constants/Pantry";

const PantryItemCard = ({ item }: { item: any }) => {
  const { brand, type, quantity, expiration_date } = item;
  const formattedDate = new Date(expiration_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftSection}>
        <Text style={styles.itemName}>
          {brand} {type}
        </Text>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={12} color="#6B7280" />
          <Text style={styles.itemDate}>{formattedDate}</Text>
        </View>
        <Text style={styles.itemCategory}>{type}</Text>
      </View>
      <Text style={styles.quantity}>
        {quantity.amount} {quantity.unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  leftSection: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    marginTop: 2,
  },
  quantity: {
    fontSize: 16,
    color: "#374151",
  },
});

export default PantryItemCard;
