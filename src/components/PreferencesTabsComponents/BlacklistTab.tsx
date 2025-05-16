import { View } from "react-native";
import InputRow from "./InputRow";
import List from "./List";
import { useState } from "react";

const BlacklistTab = ({ data }: any) => {
  const [newItem, setNewItem] = useState("");
  return (
    <View className="px-4 pt-4">
      <InputRow
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Add ingredient"
        onAdd={() => {
          if (!newItem) return;
          // addBlacklist.mutate(newItem);
          setNewItem("");
        }}
      />
      <List data={data.blacklist} onDelete={() => {}} />
    </View>
  );
};
export default BlacklistTab;
