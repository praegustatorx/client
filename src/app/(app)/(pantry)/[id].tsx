import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/src/components/DetailPageComponents/Shared/BackButton";

const PantryDetails = () => {
  const { id } = useLocalSearchParams();

  // mock pantry item — replace with fetch later
  const item = {
    id,
    brand: "Heinz",
    name: "Tomato Ketchup",
    expiration: "2025-09-30",
    quantity: "500ml",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    notes: "Store in a cool, dry place. Refrigerate after opening.",
    nutrition: {
      Calories: "100 kcal",
      Fat: "0g",
      Carbohydrates: "25g",
      Protein: "1g",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconWrapper}>
          <Image
            source={{ uri: item.image }}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.source}>{item.brand}</Text>

        <View style={styles.meta}>
          <Text style={styles.metaItem}>
            QUANTITY{"\n"}
            <Text style={styles.metaValue}>{item.quantity}</Text>
          </Text>
          <Text style={styles.metaItem}>
            EXPIRATION{"\n"}
            <Text style={styles.metaValue}>{item.expiration}</Text>
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Storage Notes</Text>
        <Text style={styles.description}>{item.notes}</Text>

        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        {Object.entries(item.nutrition).map(([key, value]) => (
          <View key={key} style={styles.nutritionRow}>
            <Text style={styles.nutritionKey}>{key}</Text>
            <Text style={styles.nutritionValue}>{value}</Text>
          </View>
        ))}
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
