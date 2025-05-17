import { render, fireEvent } from "@testing-library/react-native";
import BlacklistTab from "@/src/components/PreferencesTabsComponents/BlacklistTab";
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

jest.mock("@/src/components/PreferencesTabsComponents/List", () => {
  return function MockList(props: any) {
    const React = require("react");
    const { Text, View } = require("react-native");

    return (
      <View testID="blacklist-list">
        {props.data.map((item: string) => (
          <View key={item}>
            <Text testID={`blacklist-item-${item}`}>{item}</Text>
            <Text
              testID={`delete-${item}`}
              onPress={() => props.onDelete(item)}
            >
              Delete
            </Text>
          </View>
        ))}
      </View>
    );
  };
});

jest.mock("@/src/components/PreferencesTabsComponents/InputRow", () => {
  return function MockInputRow(props: any) {
    const React = require("react");
    const { TextInput, Button, View } = require("react-native");

    return (
      <View>
        <TextInput
          testID="blacklist-input"
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
        />
        <Button
          title="Add"
          testID="blacklist-add-button"
          onPress={props.onAdd}
        />
      </View>
    );
  };
});

describe("BlacklistTab", () => {
  const addBlacklistMock = { mutate: jest.fn() };
  const deleteBlacklistMock = { mutate: jest.fn() };
  const invalidateQueriesMock = jest.fn();
  const toastSuccessMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePreferenceMutations as jest.Mock).mockReturnValue({
      addBlacklist: addBlacklistMock,
      deleteBlacklist: deleteBlacklistMock,
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

  test("renders empty message when blacklist is empty", () => {
    const { getByText, getByTestId } = render(<BlacklistTab blacklist={[]} />);
    expect(
      getByText(/You haven’t blacklisted any ingredients yet/i)
    ).toBeTruthy();
    expect(getByTestId("blacklist-input")).toBeTruthy();
  });

  test("renders blacklist items", () => {
    const blacklist = ["Milk", "Eggs"];
    const { getByTestId, queryByText } = render(
      <BlacklistTab blacklist={blacklist} />
    );

    blacklist.forEach((item) => {
      expect(getByTestId(`blacklist-item-${item}`)).toBeTruthy();
      expect(getByTestId(`delete-${item}`)).toBeTruthy();
    });

    expect(
      queryByText(/You haven’t blacklisted any ingredients yet/i)
    ).toBeNull();
  });

  test("calls addBlacklist.mutate on add", () => {
    const { getByTestId } = render(<BlacklistTab blacklist={[]} />);

    const input = getByTestId("blacklist-input");
    const addButton = getByTestId("blacklist-add-button");

    fireEvent.changeText(input, "Onion");
    fireEvent.press(addButton);

    expect(addBlacklistMock.mutate).toHaveBeenCalledWith(
      "Onion",
      expect.any(Object)
    );
  });

  test("calls deleteBlacklist.mutate on delete", () => {
    const blacklist = ["Garlic"];
    const { getByTestId } = render(<BlacklistTab blacklist={blacklist} />);

    const deleteButton = getByTestId("delete-Garlic");
    fireEvent.press(deleteButton);

    expect(deleteBlacklistMock.mutate).toHaveBeenCalledWith(
      "Garlic",
      expect.any(Object)
    );
  });
});
