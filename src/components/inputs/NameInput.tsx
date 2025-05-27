import { View } from "react-native";
import { Feather } from "../Themed";

import { type FC } from "react";
import BaseInput from "./BaseInput";
interface NameInputProps {
  name: string;
  setName: (name: string) => void;
}
const NameInput: FC<NameInputProps> = ({ name, setName }) => {
  return (
    <View className="flex-row items-center w-full relative mb-2">
      <View className="mr-4">
        <Feather name="user" size={22} />
      </View>
      <BaseInput
        placeholder="Name"
        onChangeText={setName}
        value={name}
        testID="name-input"
      />
    </View>
  );
};
export default NameInput;
