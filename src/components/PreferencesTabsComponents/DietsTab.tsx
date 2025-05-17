import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import List from "./List";
import { FC } from "react";
import { useState } from "react";
import DietModal from "./DietModal";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";
import { Diet } from "@/src/constants/Preferences";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationToast } from "@/src/providers/ToastContext";
import DeleteIcon from "../Icons/DeleteIcon";

interface DietsTabProps {
  diets: Diet[];
}

const DietsTab: FC<DietsTabProps> = ({ diets }) => {
  const { user } = useSession();
  const { addDiet, deleteDiet } = usePreferenceMutations(user!.email);
  const { showToast } = useNotificationToast();
  const client = useQueryClient();

  const refresh = () => {
    client.invalidateQueries({ queryKey: ["preferences"] });
  };

  const onSubmit = (name: string, description: string) => {
    addDiet.mutate(
      { name, description },
      {
        onSuccess: () => {
          refresh();
          showToast({ message: "New diet added.", title: "Success" });
        },
      }
    );
  };

  const onDelete = (item: Diet) => {
    const { name } = item;
    deleteDiet.mutate(name, {
      onSuccess: () => {
        refresh();
        showToast({ message: "Diet deleted.", title: "Success" });
      },
    });
  };

  return (
    <View testID="diets-wrapper" style={styles.wrapper}>
      <DietModal onSubmit={onSubmit} />

      {diets.length === 0 && (
        <Text testID="diets-empty-message" style={styles.emptyMessage}>
          You haven’t added any diets yet. Add one using the modal above!
        </Text>
      )}

      <FlatList
        data={diets}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>
              {item.name} ({item.description})
            </Text>
            <TouchableOpacity
              testID={`delete-${item.name}`}
              onPress={() => onDelete(item)}
            >
              <DeleteIcon color="red" size={24} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // Tailwind gray-200
  },
  text: {
    fontSize: 15,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#6B7280", // Tailwind gray-500
    marginTop: 16,
    fontSize: 14,
  },
});

export default DietsTab;
