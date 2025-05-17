import { View, StyleSheet, Text } from "react-native";
import { type FC } from "react";
import InputRow from "./InputRow";
import List from "./List";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNotificationToast } from "@/src/providers/ToastContext";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";

interface BlacklistTabProps {
  blacklist: string[];
}

const BlacklistTab: FC<BlacklistTabProps> = (props) => {
  const { blacklist } = props;
  const [newItem, setNewItem] = useState("");
  const { user } = useSession();
  const client = useQueryClient();
  const { showToast } = useNotificationToast();
  const { addBlacklist, deleteBlacklist } = usePreferenceMutations(user!.email);

  const onSubmit = () => {
    addBlacklist.mutate(newItem, {
      onSuccess: () => {
        client.invalidateQueries("preferences");
        showToast({
          message: "Ingredient added to blacklist",
          title: "Success",
        });
      },
    });
  };

  const onDelete = (item: string) => {
    deleteBlacklist.mutate(item, {
      onSuccess: () => {
        client.invalidateQueries("preferences");
        showToast({
          message: "Ingredient removed from blacklist.",
          title: "Success",
        });
      },
    });
  };

  return (
    <View style={styles.container} testID="blacklist-tab">
      <InputRow
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Add ingredient"
        onAdd={() => {
          if (!newItem) return;
          onSubmit();
          setNewItem("");
        }}
      />
      {blacklist.length === 0 && (
        <Text style={styles.emptyMessage} testID="blacklist-empty-message">
          You haven’t blacklisted any ingredients yet.
        </Text>
      )}

      <List data={blacklist} onDelete={onDelete} testID="blacklist-list" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
    fontSize: 14,
  },
});

export default BlacklistTab;
