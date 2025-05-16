import React, { createContext, useContext, useState, ReactNode } from "react";
import { RecipePayload } from "../constants/Recipe";

interface PredictedItemContextType {
  recipeCards: RecipePayload[];
  setRecipeCards: React.Dispatch<React.SetStateAction<RecipePayload[]>>;
  clearRecipeCards: () => void;
}

const PredictedItemContext = createContext<
  PredictedItemContextType | undefined
>(undefined);

export const RecipeCardsProvider = ({ children }: { children: ReactNode }) => {
  const [recipeCards, setRecipeCards] = useState<RecipePayload[]>([]);

  const clearRecipeCards = () => setRecipeCards([]);

  return (
    <PredictedItemContext.Provider
      value={{
        recipeCards,
        setRecipeCards,
        clearRecipeCards,
      }}
    >
      {children}
    </PredictedItemContext.Provider>
  );
};

export const useRecipeCardsContext = () => {
  const context = useContext(PredictedItemContext);
  if (!context) {
    throw new Error(
      "usePredictedItem must be used within a PredictedItemProvider"
    );
  }
  return context;
};
