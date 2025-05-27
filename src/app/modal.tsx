import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";

import { View } from "@/src/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import FieldGroup from "../components/ManualPantryInsertModalComponents/FieldGroup";
import FieldInput from "../components/ManualPantryInsertModalComponents/FieldInput";
import { useEffect, useRef, useState } from "react";
import FieldInputWithUnitControl from "../components/ManualPantryInsertModalComponents/FieldInputWithUnitControl";
import DateInput from "../components/ManualPantryInsertModalComponents/DateInput";
import { usePutItemIngredientMutation } from "../hooks/mutations/usePutItemIngredientMutation";
import { useQueryClient } from "@tanstack/react-query";
import ManualPantryAddModal from "../components/Modal/ManualPantryAddModal";
import { usePredictedItem } from "../providers/PredictedItemContext";
import AIBanner from "../components/ManualPantryInsertModalComponents/AIBanner";
import ModalHeader from "../components/ManualPantryInsertModalComponents/ModalHeader";

export default function ModalScreen() {
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const [KCAL, setKCAL] = useState<number | undefined>(undefined);
  const [fat, setFat] = useState<number>();
  const [portion, setPortion] = useState<number | undefined>(100);
  const [portionUnit, setPortionUnit] = useState<string>("Gram");
  const [carboHydrates, setCarboHydrates] = useState<number | undefined>(
    undefined
  );
  const [protein, setProtein] = useState<number | undefined>(undefined);

  const [quantityUnit, setQuantityUnit] = useState<string>("Gram");
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
          amount: quantity ? quantity : " ",
          unit: quantityUnit,
        },
        nutrition: {
          portion: { amount: portion, unit: portionUnit },
          calories: KCAL ? KCAL : " ",
          carbs: carboHydrates ? carboHydrates : " ",
          protein: protein ? protein : " ",
          fat: fat ? fat : " ",
        },
        expiryDate: expirationDate.toISOString().split("T")[0],
      },
      {
        onSuccess: () => {
          isErrorRef.current = false;
          queryClient.invalidateQueries({ queryKey: ["pantryItems"] });
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
      setQuantity(predictedItem.quantity?.value?.amount || "");
      setQuantityUnit(predictedItem.quantity?.value?.unit || "Gram");
      setExpirationDate(
        predictedItem.expiration_date?.value
          ? new Date(predictedItem.expiration_date.value)
          : new Date()
      );
      setCarboHydrates(
        predictedItem.nutrition?.value?.carbohydrates?.amount || 0
      ),
        setProtein(predictedItem.nutrition?.value?.protein?.amount || 0);
      setFat(predictedItem.nutrition?.value?.fat?.amount || 0);
      setKCAL(predictedItem.nutrition?.value?.calories?.amount || 0);
    }
  }, [predictedItem]);

  const { mode } = useLocalSearchParams();
  const isAIPowered = mode === "ai-powered";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={[
          {
            flex: 1,
            padding: 20,
            backgroundColor: "white",
          },
        ]}
      >
        <ModalHeader isSaveDisabled={isSaveDisabled} onSave={onSave} />
        {isAIPowered && <AIBanner />}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
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
                highlight={isAIPowered}
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
                value={portion?.toString()}
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
                value={KCAL?.toString()}
                isOptional
                highlight={isAIPowered}
              />

              <FieldInput
                label={`Protein (in grams)`}
                placeholder=" 19"
                keyboardType="number-pad"
                value={protein?.toString()}
                onChangeText={setProtein}
                isOptional
                highlight={isAIPowered}
              />
              <FieldInput
                label={`Fat (in grams)`}
                placeholder="38 "
                keyboardType="number-pad"
                value={fat?.toString()}
                onChangeText={setFat}
                isOptional
                highlight={isAIPowered}
              />
              <FieldInput
                label={`Carbohydrates (in grams)`}
                placeholder="59"
                keyboardType="number-pad"
                value={carboHydrates?.toString()}
                onChangeText={setCarboHydrates}
                isOptional
                highlight={isAIPowered}
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
    </SafeAreaView>
  );
}
