import { Recipe } from "@/src/constants/Recipe";

export const dummyRecipes: Recipe[] = [
  {
    name: "Pasta Carbonara",
    description: "Classic Italian pasta dish",
    ingredients: [
      { type: "spaghetti-123", quantity: { amount: 400, unit: "gram" } },
      { type: "eggs-123", quantity: { amount: 4, unit: "cup" } },
      { type: "pancetta-123", quantity: { amount: 150, unit: "gram" } },
      { type: "parmesan-123", quantity: { amount: 50, unit: "gram" } },
      { type: "blackpepper-123" },
    ],
    instructions: [
      "Cook pasta according to package instructions",
      "Fry pancetta until crispy",
      "Beat eggs and mix with grated cheese",
      "Mix everything together while pasta is hot",
    ],
    tags: [
      { name: "Italian", description: "Italian cuisine" },
      { name: "Gluten", description: "Flour" },
      { name: "Pasta" },
    ],
  },
  {
    name: "Chicken Stir Fry",
    description: "Quick and tasty stir fry with vegetables",
    ingredients: [
      { type: "chickenbreast-123", quantity: { amount: 300, unit: "gram" } },
      { type: "soy-sauce-123", quantity: { amount: 3, unit: "tablespoon" } },
      { type: "garlic-123", quantity: { amount: 2, unit: "clove" } },
      { type: "broccoli-123", quantity: { amount: 200, unit: "gram" } },
      { type: "carrot-123", quantity: { amount: 100, unit: "gram" } },
    ],
    instructions: [
      "Slice chicken and vegetables",
      "Stir fry garlic and chicken until cooked",
      "Add vegetables and soy sauce",
      "Cook for another 5 minutes",
    ],
    tags: [
      { name: "Asian", description: "Asian-inspired cuisine" },
      { name: "Quick Meal" },
      { name: "Low Carb" },
    ],
  },
  {
    name: "Vegetarian Chili",
    description: "Hearty and spicy vegetarian chili",
    ingredients: [
      { type: "kidneybeans-123", quantity: { amount: 400, unit: "gram" } },
      { type: "tomatoes-123", quantity: { amount: 400, unit: "gram" } },
      { type: "onion-123", quantity: { amount: 1, unit: "piece" } },
      { type: "chili-powder-123", quantity: { amount: 2, unit: "teaspoon" } },
      { type: "corn-123", quantity: { amount: 150, unit: "gram" } },
    ],
    instructions: [
      "Sauté onions",
      "Add all other ingredients and simmer for 20 minutes",
      "Serve hot with bread or rice",
    ],
    tags: [{ name: "Vegetarian" }, { name: "Spicy" }, { name: "One Pot" }],
  },
  {
    name: "Avocado Toast",
    description: "Simple breakfast with mashed avocado and egg",
    ingredients: [
      { type: "bread-123", quantity: { amount: 2, unit: "slice" } },
      { type: "avocado-123", quantity: { amount: 1, unit: "piece" } },
      { type: "egg-123", quantity: { amount: 1, unit: "piece" } },
      { type: "salt-123" },
      { type: "pepper-123" },
    ],
    instructions: [
      "Toast bread slices",
      "Mash avocado and season with salt and pepper",
      "Fry or poach the egg",
      "Spread avocado on toast and top with egg",
    ],
    tags: [{ name: "Breakfast" }, { name: "Healthy" }, { name: "Quick" }],
  },
  {
    name: "Beef Tacos",
    description: "Spiced ground beef in crispy taco shells",
    ingredients: [
      { type: "groundbeef-123", quantity: { amount: 250, unit: "gram" } },
      { type: "taco-shells-123", quantity: { amount: 6, unit: "piece" } },
      { type: "cheddar-123", quantity: { amount: 100, unit: "gram" } },
      { type: "lettuce-123", quantity: { amount: 50, unit: "gram" } },
      { type: "salsa-123", quantity: { amount: 100, unit: "gram" } },
    ],
    instructions: [
      "Cook ground beef with taco seasoning",
      "Fill taco shells with beef, cheese, lettuce, and salsa",
      "Serve immediately",
    ],
    tags: [{ name: "Mexican" }, { name: "Taco Tuesday" }, { name: "Dinner" }],
  },
];
