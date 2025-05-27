import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import BackButton from "@/src/components/DetailPageComponents/Shared/BackButton";
import { usePantryItem } from "@/src/providers/PantryItemContext";
import NutritionTable from "@/src/components/PantryListComponents/NutritionTable";

const PantryDetails = () => {
  const { selectedItem } = usePantryItem();
  console.log("selectedItem", selectedItem?.nutrition);

  if (!selectedItem) {
    return;
  }

  const formattedDate = selectedItem?.expiration_date?.value
    ? new Date(selectedItem.expiration_date.value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  const { nutrition } = selectedItem;

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconWrapper}></View>

        <Text style={styles.title}>{selectedItem?.type}</Text>
        <Text style={styles.source}>{selectedItem?.brand?.value}</Text>

        <View style={styles.meta}>
          <Text style={styles.metaItem}>
            QUANTITY{"\n"}
            <Text style={styles.metaValue}>
              {selectedItem?.quantity?.value.amount}{" "}
              {selectedItem?.quantity?.value.unit}
            </Text>
          </Text>
          <Text style={styles.metaItem}>
            EXPIRATION{"\n"}
            <Text style={styles.metaValue}>{formattedDate}</Text>
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        {nutrition && (
          <NutritionTable
            calories={nutrition.value.calories.amount}
            carbohydrates={nutrition.value.carbohydrates.amount}
            fat={nutrition.value.fat.amount}
            protein={nutrition.value.protein.amount}
            portion={nutrition.value.portion.amount}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  source: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  metaItem: {
    fontSize: 12,
    textAlign: "center",
  },
  metaValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 32,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  nutritionKey: {
    fontSize: 14,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default PantryDetails;
