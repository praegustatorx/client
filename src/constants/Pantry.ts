export type Unit = {
  label: string;
  value: string;
};

export interface Measurement {
  amount: string;
  unit: string;
}

interface NutritionAmount {
  amount?: number;
  unit?: string;
}

interface Quantity {
  value?: Measurement;
}

interface Nutrition {
  value: {
    portion?: NutritionAmount;
    calories?: NutritionAmount;
    protein?: NutritionAmount;
    fat?: NutritionAmount;
    carbohydrates?: NutritionAmount;
  };
}

interface ExpirationDate {
  value: string;
}

type Brand = {
  value: string;
};

interface Ingredient {
  id?: string;
  type: string;
  nutrition?: Nutrition;
  quantity?: Quantity;
  brand?: Brand;
  expiration_date?: ExpirationDate;
}

interface ApiResponse {
  userId: string;
  ingredients: Ingredient[];
}

export type {
  ApiResponse,
  Ingredient,
  Nutrition,
  NutritionAmount as NutrientAmount,
  Brand,
  ExpirationDate,
};
