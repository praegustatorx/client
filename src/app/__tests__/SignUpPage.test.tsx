import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignUpPage from "../(auth)/SignUpPage";
import { Alert } from "react-native";
import { useRegisterMutation } from "@/src/hooks/mutations/useRegisterMutation";
import { router } from "expo-router";

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

// Mocking useRegisterMutation
jest.mock("@/src/hooks/mutations/useRegisterMutation", () => ({
  useRegisterMutation: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValueOnce({}),
  }),
}));

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  router: {
    navigate: jest.fn(),
    push: jest.fn(),
  },
}));
jest.spyOn(Alert, "alert").mockImplementation(() => {});

// Mock Alert.alert

const setup = () => {
  return render(<SignUpPage />);
};

describe("SignUpPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields", () => {
    const { getByTestId } = setup();
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("name-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("confirm-password-input")).toBeTruthy();
  });

  it("shows alert when fields are empty", async () => {
    const { getByTestId } = render(<SignUpPage />);
    fireEvent.press(getByTestId("sign-up-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Please fill out all fields"
      );
    });
  });

  it("shows alert for invalid email format", async () => {
    const { getByTestId } = setup();
    fireEvent.changeText(getByTestId("email-input"), "invalid-email");
    fireEvent.changeText(getByTestId("name-input"), "Name");
    fireEvent.changeText(getByTestId("password-input"), "Validpassword123");
    fireEvent.changeText(
      getByTestId("confirm-password-input"),
      "Validpassword123"
    );

    fireEvent.press(getByTestId("sign-up-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Please enter a valid email address"
      );
    });
    //todo
  });

  it("shows alert when passwords don't match", async () => {
    const { getByTestId } = setup();
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(
      getByTestId("confirm-password-input"),
      "differentPassword"
    );
    fireEvent.press(getByTestId("sign-up-button"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Passwords do not match"
      );
    });
  });

  it("navigates to the home page and shows success alert on successful registration", async () => {
    const { getByTestId } = setup();

    // Simulating user input
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("name-input"), "Name");
    fireEvent.changeText(getByTestId("password-input"), "Validpassword123");
    fireEvent.changeText(
      getByTestId("confirm-password-input"),
      "Validpassword123"
    );

    // Simulating button press
    fireEvent.press(getByTestId("sign-up-button"));

    await waitFor(() => {
      const mutateAsyncMock = useRegisterMutation().mutateAsync as jest.Mock;

      expect(mutateAsyncMock).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          name: "Name",
          password: "Validpassword123",
        },
        expect.anything()
      );

      // locate and call onSuccess.
      // the type here is any because the function is not typed in the original code
      // mock.calls is an array of arrays and you can get the onSuccess. and onError callback from here.
      const onSuccess = mutateAsyncMock.mock.calls[0][1].onSuccess;
      onSuccess();

      expect(router.push).toHaveBeenCalledWith("/");

      expect(Alert.alert).toHaveBeenCalledWith(
        "Registration successful",
        "You can now try and log in"
      );
    });
  });

  it("shows alert when passwords don't match", async () => {
    const { getByTestId } = setup();

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "ValidPass123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Mismatch123");

    fireEvent.press(getByTestId("sign-up-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Passwords do not match"
      );
    });
  });

  it("shows alert for invalid password length", async () => {
    const { getByTestId } = setup();

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "short1A");
    fireEvent.changeText(getByTestId("confirm-password-input"), "short1A");

    fireEvent.press(getByTestId("sign-up-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Password must be between 8 and 36 characters long"
      );
    });
  });

  it("handles API error and shows alert with message", async () => {
    (useRegisterMutation as jest.Mock).mockReturnValueOnce({
      mutateAsync: jest.fn().mockImplementation(() => {}),
    });

    const message = "Email already in use";
    const { getByTestId } = setup();

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("name-input"), "Name");
    fireEvent.changeText(getByTestId("password-input"), "ValidPass123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "ValidPass123");

    fireEvent.press(getByTestId("sign-up-button"));

    const mutateAsyncMock = useRegisterMutation().mutateAsync as jest.Mock;

    const onError = mutateAsyncMock.mock.calls[0][1].onError;
    onError({ message });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", message);
    });
  });

  it("shows invalid email format validation message", async () => {
    const { getByTestId, getByText } = setup();

    const emailInput = getByTestId("email-input");

    fireEvent.changeText(emailInput, "test");
    fireEvent(emailInput, "blur");
    expect(getByText("Invalid email format")).toBeTruthy();
  });

  it("shows invalid password length validation message", async () => {
    const { getByTestId, getByText } = setup();

    const passwordInput = getByTestId("password-input");

    fireEvent.changeText(passwordInput, "test");
    fireEvent(passwordInput, "blur");
    expect(
      getByText("Password must be between 8 and 36 characters")
    ).toBeTruthy();
  });

  it("shows invalid password format validation message", async () => {
    const { getByTestId, getByText } = setup();

    const passwordInput = getByTestId("password-input");

    fireEvent.changeText(passwordInput, "12345678");
    fireEvent(passwordInput, "blur");

    expect(
      getByText(
        "Passwords must include at least one uppercase letter and one number"
      )
    ).toBeTruthy();
  });

  it("shows passwords dont match validation message", async () => {
    const { getByTestId, getByText } = setup();

    const passwordInput = getByTestId("password-input");
    const confirmPasswordInput = getByTestId("confirm-password-input");

    fireEvent.changeText(passwordInput, "Password1A");
    fireEvent.changeText(confirmPasswordInput, "Password1A");

    fireEvent(confirmPasswordInput, "blur");

    expect(getByText("Passwords do not match!")).toBeTruthy();
  });
});
