export type Slide = {
  id: number;
  title: string;
  description: string;
  image: any;
};

export const slides: Slide[] = [
  {
    id: 1,
    title: "Snap & Save Ingredients",
    description:
      "Take a photo of your ingredients and let the app detect them automatically. Review and confirm with a single tap.",
    image: require("@/assets/images/placeholder.png"),
  },
  {
    id: 2,
    title: "AI-Powered Pantry Insights",
    description:
      "Smart predictions prefill details like quantity, type, and expiry — helping you stay organized effortlessly.",
    image: require("@/assets/images/placeholder.png"),
  },
  {
    id: 3,
    title: "Chat with Your AI Assistant",
    description:
      "Need ideas? Talk to your AI assistant to get personalized recipe suggestions based on what’s in your pantry.",
    image: require("@/assets/images/placeholder.png"),
  },
  {
    id: 4,
    title: "Organize with Custom Tags",
    description:
      "Create custom tags like 'vegan', 'breakfast', or 'meal prep' so you can filter and find ingredients easily.",
    image: require("@/assets/images/placeholder.png"),
  },
];
