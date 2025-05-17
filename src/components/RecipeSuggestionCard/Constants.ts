export interface Card {
  title: string;
  description: string;
  cookTime: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
}

export const dummyCards: Card[] = [
  {
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich tomato meat sauce.",
    cookTime: 30,
    difficulty: "Easy",
  },
  {
    title: "Chicken Curry",
    description: "Tender chicken simmered in a creamy and spicy curry sauce.",
    cookTime: 45,
    difficulty: "Medium",
  },
  {
    title: "Beef Wellington",
    description:
      "Juicy beef tenderloin wrapped in puff pastry and baked to perfection.",
    cookTime: 90,
    difficulty: "Hard",
  },
  {
    title: "Vegetable Stir Fry",
    description:
      "Quick and colorful stir-fried veggies in a savory soy sauce glaze.",
    cookTime: 20,
    difficulty: "Easy",
  },
  {
    title: "Shrimp Tacos",
    description:
      "Spicy grilled shrimp served in warm tortillas with fresh toppings.",
    cookTime: 25,
    difficulty: "Medium",
  },
];
