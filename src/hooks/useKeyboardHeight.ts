import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onKeyboardShown = (event: any) => {
    setKeyboardHeight(event.endCoordinates.height);
  };
  const onKeyboardHidden = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardShown
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardHidden
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardHeight;
};
export default useKeyboardHeight;
