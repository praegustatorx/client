import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Allergy } from "@/src/constants/Allergy";
import InputRow from "./InputRow";
import { type FC } from "react";
import List from "./List";
import AllergyDropdown from "./AllergyDropDown";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
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
        client.invalidateQueries({ queryKey: ["preferences"] });
        showToast({
          message: "Allergy removed.",
          title: "Success",
        });
      },
    });
  };

  return (
    <View style={styles.container} testID="allergies-tab">
      <AllergyDropdown
        value={selectedAllergy}
        onChange={setSelectedAllergy}
        disabledItems={alreadyAdded}
        testID="allergy-dropdown"
      />

      {allergies.length === 0 && (
        <Text style={styles.emptyMessage} testID="allergies-empty-message">
          You haven’t added any allergies yet. Add one using the dropdown above!
        </Text>
      )}

      <List data={allergies} onDelete={onDelete} testID="allergies-list" />
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
    color: "#6B7280", // Tailwind gray-500
    marginTop: 16,
    fontSize: 14,
  },
});

export default AllergiesTab;
