import { View } from "react-native";
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
        showToast({ message: "New diet added.", title: "Success" });

        console.log("Added");
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
    <View className="px-4 pt-4">
      <InputRow
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Add ingredient"
        onAdd={() => {
          if (!newItem) return;
          // addBlacklist.mutate(newItem);
          onSubmit();
          setNewItem("");
        }}
      />
      <List data={blacklist} onDelete={onDelete} />
    </View>
  );
};
export default BlacklistTab;
