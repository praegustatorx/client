import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

/**
 * Custom hook to manage state synchronized with local storage or secure store.
 *
 * @param {string} key - The key to identify the stored value.
 * @returns {UseStateHook<string>} - A stateful value and a function to update it.
 *
 * This hook works differently based on the platform:
 * - On web, it uses `localStorage` to persist the state,
 * - On other platforms, it uses `SecureStore` to persist the state.
 *
 * The state is initialized by reading the value from the appropriate storage.
 * The `setValue` function updates both the state and the storage.
 *
 * @example
 * const [value, setValue] = useStorageState('myKey');
 * setValue('newValue');
 */
export function useStorageState<T = string>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  useEffect(() => {
    const load = async () => {
      try {
        let rawValue: string | null = null;
        if (Platform.OS === "web") {
          rawValue =
            typeof localStorage !== "undefined"
              ? localStorage.getItem(key)
              : null;
        } else {
          rawValue = await SecureStore.getItemAsync(key);
        }

        if (rawValue !== null) {
          setState(JSON.parse(rawValue));
        } else {
          setState(null);
        }
      } catch (e) {
        console.error("Failed to load or parse stored value:", e);
        setState(null);
      }
    };

    load();
  }, [key]);

  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      const serialized = value === null ? null : JSON.stringify(value);
      setStorageItemAsync(key, serialized);
    },
    [key]
  );

  return [state, setValue];
}
