// AllergiesTab.test.tsx

import { render, fireEvent } from "@testing-library/react-native";
import AllergiesTab from "@/src/components/PreferencesTabsComponents/AllergiesTab";
import { usePreferenceMutations } from "@/src/hooks/mutations/usePreferenceMutations";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { useNotificationToast } from "@/src/providers/ToastContext";
import { useQueryClient } from "react-query";
jest.mock("@/src/hooks/mutations/usePreferenceMutations", () => ({
  usePreferenceMutations: jest.fn(),
}));

jest.mock("@/src/providers/auth/AuthProvider", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/src/providers/ToastContext", () => ({
  useNotificationToast: jest.fn(),
}));
jest.mock("react-query", () => {
  const actual = jest.requireActual("react-query");
  return {
    ...actual,
    useQueryClient: jest.fn(),
  };
});
jest.mock(
  "@/src/components/PreferencesTabsComponents/List",
  () =>
    function MockList(props: any) {
      const React = require("react");
      const { Text, View } = require("react-native");

      return props.data.map((item: string) => (
        <View key={item}>
          <Text testID={`allergy-item-${item}`}>{item}</Text>
          <Text testID={`delete-${item}`} onPress={() => props.onDelete(item)}>
            Delete
          </Text>
        </View>
      ));
    }
);

jest.mock(
  "@/src/components/PreferencesTabsComponents/AllergyDropDown",
  () =>
    function MockDropdown() {
      const React = require("react");
      const { Text } = require("react-native");

      return <Text testID="allergy-dropdown" />;
    }
);


describe("AllergiesTab", () => {
  const deleteAllergyMock = jest.fn();
  const invalidateQueriesMock = jest.fn();
  const toastSuccessMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePreferenceMutations as jest.Mock).mockReturnValue({
      deleteAllergy: { mutate: deleteAllergyMock },
    });

    (useSession as jest.Mock).mockReturnValue({
      user: { email: "test-user@example.com" },
    });

    (useNotificationToast as jest.Mock).mockReturnValue({
      showToast: toastSuccessMock,
    });

    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: invalidateQueriesMock,
    });
  });

  test("renders empty message when allergies list is empty", () => {
    const { getByText, getByTestId } = render(<AllergiesTab allergies={[]} />);
    expect(getByText(/You haven’t added any allergies yet/i)).toBeTruthy();
    expect(getByTestId("allergy-dropdown")).toBeTruthy();
  });

  test("renders list of allergies", () => {
    const allergies = ["Peanuts", "Gluten"];
    const { getByTestId, queryByText } = render(
      <AllergiesTab allergies={allergies} />
    );

    // Allergy dropdown renders
    expect(getByTestId("allergy-dropdown")).toBeTruthy();

    // Allergies render
    allergies.forEach((allergy) => {
      expect(getByTestId(`allergy-item-${allergy}`)).toBeTruthy();
      expect(getByTestId(`delete-${allergy}`)).toBeTruthy();
    });

    // Empty message is not shown
    expect(queryByText(/You haven’t added any allergies yet/i)).toBeNull();
  });

  test("calls deleteAllergy.mutate on delete press", () => {
    const allergies = ["Peanuts"];
    const { getByTestId } = render(<AllergiesTab allergies={allergies} />);

    const deleteButton = getByTestId("delete-Peanuts");
    fireEvent.press(deleteButton);

    expect(deleteAllergyMock).toHaveBeenCalledTimes(1);
    expect(deleteAllergyMock).toHaveBeenCalledWith(
      "Peanuts",
      expect.any(Object)
    );
  });
});
