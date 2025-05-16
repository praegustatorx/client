import React, { useState } from "react";
import { View } from "react-native";
import { Allergy } from "@/src/constants/Allergy";
import InputRow from "./InputRow";
import List from "./List";
import AllergyDropdown from "./AllergyDropDown";

const AllergiesTab = ({ data }: any) => {
  const [selectedAllergy, setSelectedAllergy] = useState<Allergy | null>(null);
  const [alreadyAdded, setAlreadyAdded] = useState<Allergy[]>([]);

  <AllergyDropdown
    value={selectedAllergy}
    onChange={setSelectedAllergy}
    disabledItems={alreadyAdded}
  />;

  return (
    <View className="px-4 pt-4">
      <AllergyDropdown
        value={selectedAllergy}
        onChange={setSelectedAllergy}
        disabledItems={alreadyAdded}
      />
      <List data={data.allergies} onDelete={() => {}} />
    </View>
  );
};
export default AllergiesTab;
