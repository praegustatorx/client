import { createContext, useContext, useState, ReactNode } from "react";
import { Ingredient } from "@/src/constants/Pantry";

interface PantryItemContextType {
  selectedItem: Ingredient | null;
  setSelectedItem: (item: Ingredient) => void;
}

const PantryItemContext = createContext<PantryItemContextType | undefined>(
  undefined
);

export const PantryItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<Ingredient | null>(null);

  return (
    <PantryItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </PantryItemContext.Provider>
  );
};

export const usePantryItem = () => {
  const context = useContext(PantryItemContext);
  if (!context) {
    throw new Error("usePantryItem must be used within a PantryItemProvider");
  }
  return context;
};
