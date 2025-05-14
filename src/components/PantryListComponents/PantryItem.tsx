import { type FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { Ingredient } from "@/src/constants/Pantry";
import DeleteIcon from "../Icons/DeleteIcon";
import { FontAwesome } from "@expo/vector-icons";
import { useDeletePantryIngredient } from "@/src/hooks/mutations/useDeletePantryIngredient";
import { useQueryClient } from "react-query";
import { useNotificationToast } from "@/src/providers/ToastContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { usePantryItem } from "@/src/providers/PantryItemContext";
import { formatDate } from "@/src/utils/FormatDate";
interface PantryItemProps {
  item: Ingredient;
  index: number;
}

const PantryItem: FC<PantryItemProps> = ({ item, index }) => {
  const mutation = useDeletePantryIngredient();
  const client = useQueryClient();
  const { showToast } = useNotificationToast();
  const { setSelectedItem } = usePantryItem();

  const now = new Date();
  const isExpired = item.expiration_date?.value
    ? new Date(item.expiration_date.value) <= now
    : false;

  const formattedDate = formatDate(item.expiration_date?.value);

  const onDeletePantryItem = (
    userId: string,
    pantryItemId: string | undefined
  ) => {
    if (!pantryItemId) {
      return;
    }
    mutation.mutate(
      { userId, pantryItemId },
      {
        onSuccess: () => {
          client.invalidateQueries("pantryItems");
          showToast({
            title: "Item Deleted",
            message: "Item has been deleted from the pantry",
            duration: 3000,
          });
        },
        onError: () => {
          showToast({
            title: "Failure",
            message: "Something went wrong.",
            duration: 3000,
          });
        },
      }
    );
  };

  const handlePress = () => {
    setSelectedItem(item);
    router.push("/(app)/(pantry)/details");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={styles.cardContainer}
        entering={FadeInDown.duration(800).delay(index * 100)}
      >
        {/* Left Icon */}
        <MaterialCommunityIcons
          name="food-variant"
          size={24}
          color="#6B7280"
          style={styles.leftIcon}
        />

        {/* Main Info */}
        <View style={styles.middleSection}>
          <Text style={styles.brandText}>
            {item.brand?.value ?? "No Brand"}
          </Text>
          <Text style={styles.typeText}>{item.type}</Text>
          <View style={styles.row}>
            <FontAwesome name="calendar" size={12} color="#6B7280" />
            <Text style={styles.itemDate}>
              {formattedDate}
              {isExpired && <Text style={styles.expiredText}> (Expired)</Text>}
            </Text>
          </View>
        </View>

        {/* Quantity + Delete */}
        <View style={styles.rightSection}>
          <Text style={styles.quantity}>
            {item.quantity?.value?.amount ?? ""}{" "}
            {item.quantity?.value?.unit ?? ""}
          </Text>
          {mutation.isLoading ? (
            <ActivityIndicator
              size="small"
              color="green"
              style={{ marginLeft: 12 }}
            />
          ) : (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeletePantryItem("user123", item.id)}
            >
              <DeleteIcon size={20} color={"ff6b6b"} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  expiredContainer: {
    backgroundColor: "#FEE2E2", // Light red tint
  },
  leftIcon: {
    marginRight: 10,
  },
  middleSection: {
    flex: 1,
  },
  brandText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  typeText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
  },
  itemDate: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  expiredText: {
    color: "#DC2626", // red-600
    fontWeight: "600",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 12,
  },
  quantity: {
    flexDirection: "row",
    textAlign: "right",
  },
  amountText: {
    fontSize: 16,
    color: "#374151",
  },
  unitText: {
    fontSize: 13,
    color: "#6B7280",
  },
  deleteButton: {
    marginLeft: 12,
    padding: 8,
  },
});

export default PantryItem;
