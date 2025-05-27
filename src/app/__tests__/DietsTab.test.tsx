// DietsTab.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { useNotificationToast } from "@/src/providers/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import DietsTab from "@/src/components/PreferencesTabsComponents/DietsTab";

jest.mock("@/src/hooks/mutations/usePreferenceMutations", () => ({
  usePreferenceMutations: jest.fn(),
}));

jest.mock("@/src/providers/auth/AuthProvider", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/src/providers/ToastContext", () => ({
  useNotificationToast: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: jest.fn(),
  };
});

jest.mock(
  "@/src/components/PreferencesTabsComponents/DietModal",
  () => () => null
);
jest.mock("@/src/components/Icons/DeleteIcon", () => () => null);

// Prepare jest.fn() stubs for mutation and toast behaviors
const deleteDietMock = jest.fn();
const invalidateQueriesMock = jest.fn();
const toastSuccessMock = jest.fn();
const toastErrorMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (usePreferenceMutations as jest.Mock).mockReturnValue({
    addDiet: { mutate: jest.fn() },
    deleteDiet: { mutate: deleteDietMock },
  });

  (useSession as jest.Mock).mockReturnValue({
    user: { id: "test-user-id", email: "test@example.com" },
    signIn: jest.fn(),
  });

  (useNotificationToast as jest.Mock).mockReturnValue({
    success: toastSuccessMock,
    error: toastErrorMock,
    showToast: jest.fn(),
  });

  (useQueryClient as jest.Mock).mockReturnValue({
    invalidateQueries: invalidateQueriesMock,
  });
});

describe("DietsTab", () => {
  test("renders empty message when diets prop is empty", () => {
    const { getByTestId } = render(<DietsTab diets={[]} />);
    expect(getByTestId("diets-empty-message")).toBeTruthy();
  });

  test("renders diet items when diets are provided", () => {
    const diets = [
      { name: "Vegan", description: "Vegan" },
      { name: "Paleo", description: "Paleo" },
    ];
    const { getByText, queryByTestId } = render(<DietsTab diets={diets} />);
    expect(getByText("Vegan (Vegan)")).toBeTruthy();
    expect(getByText("Paleo (Paleo)")).toBeTruthy();
    expect(queryByTestId("diets-empty-message")).toBeNull();
  });

  test("calls delete mutation when delete button is pressed", () => {
    const diets = [{ name: "Vegan", description: "Vegan" }];
    const { getByTestId } = render(<DietsTab diets={diets} />);
    const deleteButton = getByTestId("delete-Vegan");
    fireEvent.press(deleteButton);
    expect(deleteDietMock).toHaveBeenCalledTimes(1);
    expect(deleteDietMock).toHaveBeenCalledWith("Vegan", expect.any(Object));
  });
});
