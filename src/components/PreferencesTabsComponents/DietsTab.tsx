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
import { useQueryClient } from "react-query";
import { useNotificationToast } from "@/src/providers/ToastContext";
import DeleteIcon from "../Icons/DeleteIcon";
interface DietsTabProps {
  diets: Diet[];
}

const DietsTab: FC<DietsTabProps> = (props) => {
  const { diets } = props;
  const { user } = useSession();
  const { addDiet, deleteDiet } = usePreferenceMutations(user!.email);
  const { showToast } = useNotificationToast();

  const client = useQueryClient();
  const onSubmit = (name: string, description: string) => {
    addDiet.mutate(
      { name, description },
      {
        onSuccess: () => {
          client.invalidateQueries("preferences");
          showToast({ message: "New diet added.", title: "Success" });
        },
      }
    );
  };

  const onDelete = (item: Diet) => {
    const { name } = item;
    deleteDiet.mutate(name, {
      onSuccess: () => {
        client.invalidateQueries("preferences");
        showToast({ message: "Diet deleted.", title: "Success" });
      },
    });
  };

  return (
    <View className="px-4 pt-4">
      <DietModal onSubmit={onSubmit} />
      <FlatList
        data={diets}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.text}>
              {item.name} ({item.description})
            </Text>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <DeleteIcon color="red" size={24} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: { fontSize: 15 },
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});
export default DietsTab;
