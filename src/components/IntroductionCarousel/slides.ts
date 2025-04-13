export type Slide = {
  id: number;
  title: string;
  description: string;
  image: any;
};

export const slides: Slide[] = [
  {
    id: 1,
    title: "Title for Slide 1",
    description:
      "Brief and cool description of the first point. This is more text and more and more and more LEBROOOON",
    image: require("@/assets/images/placeholder.png"),
  },
  {
    id: 2,
    title: "Title for Slide 2",
    description:
      "Brief and cool description of the first point. This is more text and more and more and more LEBROOOON",
    image: require("@/assets/images/placeholder.png"),
  },
  {
    id: 3,
    title: "Title for Slide 3",
    description:
      "Brief and cool description of the first point. This is more text and more and more and more LEBROOOON",
    image: require("@/assets/images/placeholder.png"),
  },
  {
    id: 4,
    title: "Title for Slide 4",
    description:
      "Brief and cool description of the first point. This is more text and more and more and more LEBROOOON",
    image: require("@/assets/images/placeholder.png"),
  },
];
