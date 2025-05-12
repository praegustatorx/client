interface Brand {
  value?: string;
}

export type Unit = {
  label: string;
  value: string;
};

interface QuantityValue {
  quantity: number;
  unit: string;
}

interface Quantity {
  value: QuantityValue;
}

interface NutrientAmount {
  amount: number;
  unit: string;
}

interface Portion {
  amount: number;
  unit: string;
}

interface Nutrition {
  portion: Portion;
  calories: NutrientAmount[];
  protein: NutrientAmount;
  fat: NutrientAmount;
  carbohydrates: NutrientAmount;
}

interface ExpirationDate {
  value: string;
}

interface Ingredient {
  id: string;
  brand: Brand;
  genericId: string;
  quantity: Quantity;
  nutrition: Nutrition;
  expiration_date: ExpirationDate;
}

interface ApiResponse {
  userId: string;
  ingredients: Ingredient[];
}

export type {
  ApiResponse,
  Ingredient,
  Nutrition,
  NutrientAmount,
  Quantity,
  QuantityValue,
  Brand,
  Portion,
  ExpirationDate,
};
