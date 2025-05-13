import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Pressable,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

import { Text, View } from "@/src/components/Themed";
import { router } from "expo-router";
import FieldGroup from "../components/ManualPantryInsertModalComponents/FieldGroup";
import FieldInput from "../components/ManualPantryInsertModalComponents/FieldInput";
import { useEffect, useRef, useState } from "react";
import FieldInputWithUnitControl from "../components/ManualPantryInsertModalComponents/FieldInputWithUnitControl";
import DateInput from "../components/ManualPantryInsertModalComponents/DateInput";
import { usePutItemIngredientMutation } from "../hooks/mutations/usePutItemIngredientMutation";
import { useQueryClient } from "react-query";
import ManualPantryAddModal from "../components/Modal/ManualPantryAddModal";
import { usePredictedItem } from "../providers/PredictedItemContext";

export default function ModalScreen() {
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [KCAL, setKCAL] = useState<string>("");
  const [portion, setPortion] = useState<string>("100");
  const [protein, setProtein] = useState<string>("");

  const [fat, setFat] = useState<string>("");
  const [carboHydrates, setCarboHydrates] = useState<string>("");

  const [quantityUnit, setQuantityUnit] = useState<string>("Gram");
  const [portionUnit, setPortionUnit] = useState<string>("Gram");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [notificationModalVisible, setNotificationModalVisible] =
    useState<boolean>(false);
  const isErrorRef = useRef<boolean>(false);

  const putIngredientInPantry = usePutItemIngredientMutation();
  const queryClient = useQueryClient();

  const checkIfSaveDisabled = () => {
    if (!category) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  };

  const onSave = () => {
    if (!category) {
      Alert.alert("Error", "Please fill out all mandatory fields.");
      return;
    }
    putIngredientInPantry.mutate(
      {
        brand: brand,
        type: category,
        quantity: {
          amount: quantity,
          unit: quantityUnit,
        },
        nutrition: {
          portion: { amount: portion, unit: portionUnit },
          calories: KCAL,
          protein: protein,
          fat: fat,
          carbohydrates: carboHydrates,
        },
        expiration_date: expirationDate.toISOString().split("T")[0],
      },
      {
        onSuccess: () => {
          isErrorRef.current = false;
          queryClient.invalidateQueries(["pantryItems"]);
          setNotificationModalVisible(true);

          setTimeout(() => {
            setNotificationModalVisible(false);
            router.back();
          }, 3000);
        },
        onError: () => {
          isErrorRef.current = true;
          setNotificationModalVisible(true);

          setTimeout(() => {
            setNotificationModalVisible(false);
          }, 3500);
        },
      }
    );
  };

  const { predictedItem, clearPredictedItem } = usePredictedItem();

  useEffect(() => {
    return () => {
      clearPredictedItem();
    };
  }, []);

  useEffect(() => {
    if (predictedItem) {
      setCategory(predictedItem.type);
      setBrand(predictedItem.brand?.value || "");
      setQuantity(predictedItem.quantity?.value.amount || "");
      setQuantityUnit(predictedItem.quantity?.value.unit || "Gram");
      setExpirationDate(
        predictedItem.expiration_date?.value
          ? new Date(predictedItem.expiration_date.value)
          : new Date()
      );
      setCarboHydrates(
        predictedItem.nutrition?.value.carbohydrates.amount.toString() || "0"
      ),
        setProtein(
          predictedItem.nutrition?.value.protein.amount.toString() || "0"
        );
      setFat(predictedItem.nutrition?.value.fat.amount.toString() || "0");
      setKCAL(predictedItem.nutrition?.value.calories.amount.toString() || "0");
    }
  }, [predictedItem]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.close}>×</Text>
        </Pressable>
        <TouchableOpacity onPress={onSave} disabled={isSaveDisabled}>
          <Text style={[styles.save, isSaveDisabled && styles.saveDisabled]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <FieldGroup groupTitle="General Information">
            <FieldInput
              label="Category"
              placeholder="e.g. Milk"
              keyboardType="default"
              value={category}
              onChangeText={(text: string) => {
                setCategory(text), checkIfSaveDisabled();
              }}
            />
            <FieldInput
              onChangeText={setBrand}
              value={brand}
              label="Brand"
              placeholder="e.g. Arla"
              keyboardType="default"
              isOptional
            />
            <FieldInputWithUnitControl
              value={quantity}
              setValue={setQuantity}
              selectedUnit={quantityUnit}
              setSelectedUnit={setQuantityUnit}
              label="Quantity"
              isOptional
            />
            <DateInput
              date={expirationDate}
              setDate={setExpirationDate}
              label="Expiration Date"
            />
          </FieldGroup>
          <FieldGroup groupTitle="Nutritional Information">
            <FieldInputWithUnitControl
              value={portion}
              setValue={setPortion}
              selectedUnit={portionUnit}
              setSelectedUnit={setPortionUnit}
              label="Portion"
              isOptional
            />
            <FieldInput
              label={`Calories (kcal)`}
              placeholder="395"
              keyboardType="number-pad"
              onChangeText={setKCAL}
              value={KCAL}
              isOptional
            />

            <FieldInput
              label={`Protein (in grams)`}
              placeholder=" 19"
              keyboardType="number-pad"
              value={protein}
              onChangeText={setProtein}
              isOptional
            />
            <FieldInput
              label={`Fat (in grams)`}
              placeholder="38 "
              keyboardType="number-pad"
              value={fat}
              onChangeText={setFat}
              isOptional
            />
            <FieldInput
              label={`Carbohydrates (in grams)`}
              placeholder="59"
              keyboardType="number-pad"
              value={carboHydrates}
              onChangeText={setCarboHydrates}
              isOptional
            />
          </FieldGroup>
        </ScrollView>
        <ManualPantryAddModal
          isError={isErrorRef.current}
          setVisible={setNotificationModalVisible}
          visible={notificationModalVisible}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  close: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  save: {
    color: "white", // Green color
    fontWeight: "500",
    fontSize: 15,
    padding: 10,
    backgroundColor: "#4CAF50", // Green background
    borderRadius: 8,
    textAlign: "center",
  },
  saveDisabled: {
    opacity: 0.3, // Make the button look disabled
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
});
