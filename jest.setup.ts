// jest.setup.js
console.log("Setup File initialized");

jest.mock("expo-font");
jest.mock("expo-asset");

// Mocking Feather icons for Jest
jest.mock("react-native-vector-icons/Feather", () => "FeatherIconMock");

// You can mock other dependencies or set up global variables here
jest.mock("@expo/vector-icons", () => ({
  Feather: "FeatherIconMock",
}));
