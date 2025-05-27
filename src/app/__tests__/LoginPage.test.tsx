import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { router } from "expo-router";

import LoginPage from "../(auth)/LoginPage";

// mocking useSession
const mockSignIn = jest.fn();
jest.mock("../../providers/auth/AuthProvider", () => ({
  useSession: () => ({
    signIn: mockSignIn,
  }),
}));

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  router: {
    navigate: jest.fn(),
    push: jest.fn(),
  },
}));

// mock Alert.alert
jest.spyOn(Alert, "alert");

const setup = () => {
  return render(<LoginPage />);
};

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email and password inputs", () => {
    const { getByTestId } = setup();
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
  });

  it("calls signIn with email and password when both are filled", () => {
    const { getByTestId } = setup();

    const loginButton = getByTestId("login-button");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("shows alert when email or password is empty", async () => {
    const { getByTestId } = setup();
    const loginButton = getByTestId("login-button");

    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Please enter email and password"
      );
    });
  });
});
