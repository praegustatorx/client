export interface Quantity {
  amount: number;
  unit: string;
}

export interface Ingredient {
  type: string;
  quantity?: Quantity; // Optional, like in blackpepper-123
}

export interface Tag {
  name: string;
  description?: string;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags?: Tag[];
}

export interface RecipePayload {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags?: Tag[];
}
