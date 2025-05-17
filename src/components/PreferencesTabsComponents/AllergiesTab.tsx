import React, { useState } from "react";
import { View } from "react-native";
import { Allergy } from "@/src/constants/Allergy";
import InputRow from "./InputRow";
import { type FC } from "react";
import List from "./List";
import AllergyDropdown from "./AllergyDropDown";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { useQueryClient } from "react-query";
import { useNotificationToast } from "@/src/providers/ToastContext";
interface AllergiesTabProps {
  allergies: string[];
}

const AllergiesTab: FC<AllergiesTabProps> = (props) => {
  const { allergies } = props;
  const [selectedAllergy, setSelectedAllergy] = useState<Allergy | null>(null);
  const [alreadyAdded, setAlreadyAdded] = useState<string[]>(allergies);
  const { user } = useSession();
  const client = useQueryClient();
  const { showToast } = useNotificationToast();
  const { deleteAllergy } = usePreferenceMutations(user!.email);

  const onDelete = (item: string) => {
    deleteAllergy.mutate(item, {
      onSuccess: () => {
        client.invalidateQueries("preferences");
        showToast({
          message: "Allergy removed.",
          title: "Success",
        });
      },
    });
  };
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
      <List data={allergies} onDelete={onDelete} />
    </View>
  );
};
export default AllergiesTab;
