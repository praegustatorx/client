import React, { createContext, useContext, useState, ReactNode } from "react";
import { Ingredient } from "@/src/constants/Pantry";

interface PredictedItemContextType {
  predictedItem: Ingredient | null;
  setPredictedItem: (item: Ingredient | null) => void;
  clearPredictedItem: () => void;
}

const PredictedItemContext = createContext<
  PredictedItemContextType | undefined
>(undefined);

export const PredictedItemProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [predictedItem, setPredictedItem] = useState<Ingredient | null>(null);

  const clearPredictedItem = () => setPredictedItem(null);

  return (
    <PredictedItemContext.Provider
      value={{ predictedItem, setPredictedItem, clearPredictedItem }}
    >
      {children}
    </PredictedItemContext.Provider>
  );
};

export const usePredictedItem = () => {
  const context = useContext(PredictedItemContext);
  if (!context) {
    throw new Error(
      "usePredictedItem must be used within a PredictedItemProvider"
    );
  }
  return context;
};
