import { TextInput, TouchableOpacity, View, Text } from "react-native";
import List from "./List";
import { useState } from "react";
import DietModal from "./DietModal";
const DietsTab = ({ data }: any) => {
  const [newDiet, setNewDiet] = useState({ name: "", description: "" });
  return (
    <View className="px-4 pt-4">
      <DietModal onSubmit={() => {}} />
      <List
        data={data.diets.map((d: any) => `${d.name} (${d.description})`)}
        onDelete={() => {}}
      />
    </View>
  );
};

export default DietsTab;
