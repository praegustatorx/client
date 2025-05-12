import { type FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { Ingredient } from "@/src/constants/Pantry";
import DeleteIcon from "../Icons/DeleteIcon";
import { Ionicons } from "@expo/vector-icons"; // Ensure expo/vector-icons is installed
import { useDeletePantryIngredient } from "@/src/hooks/mutations/useDeletePantryIngredient";
import { useQueryClient } from "react-query";
import { useNotificationToast } from "@/src/providers/ToastContext";

interface PantryItemProps {
  item: Ingredient;
}

const PantryItem: FC<PantryItemProps> = ({ item }) => {
  const mutation = useDeletePantryIngredient();
  const client = useQueryClient();
  const { showToast } = useNotificationToast();

  const onDeletePantryItem = (userId: string, pantryItemId: string) => {
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

  return (
    <View style={styles.card}>
      <Link href={`/(app)/(pantry)/${item.id}`} asChild>
        <TouchableOpacity style={styles.infoArea}>
          <View>
            <Text style={styles.name}>{item.brand.value}</Text>
            <Text style={styles.expiry}>
              Expires: {item.expiration_date.value}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>

      {mutation.isLoading ? (
        <ActivityIndicator size="small" color="green" />
      ) : (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeletePantryItem("user123", item.id)}
        >
          <DeleteIcon size={20} color={"ff6b6b"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  infoArea: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  expiry: {
    fontSize: 13,
    color: "#aaa",
    fontStyle: "italic",
  },
  deleteButton: {
    padding: 8,
  },
});

export default PantryItem;
