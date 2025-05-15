import { createContext, useContext, useState, ReactNode } from "react";
import { Ingredient as any } from "@/src/constants/Pantry";

//TODO REPLACE ANY WITH RECIPE TYPE

interface PantryItemContextType {
  selectedItem: any | null;
  setSelectedItem: (item: any) => void;
}

const PantryItemContext = createContext<PantryItemContextType | undefined>(
  undefined
);

export const PantryItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

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
