import { type FC } from "react";
import { View, Text } from "react-native";

interface EmptyListProps {
  text: string;
}

const EmptyPantryList: FC<EmptyListProps> = (props) => {
  const { text } = props;
  return (
    <View className="bg-blue-300 h-[100%] flex-1">
      <Text> {text} </Text>
    </View>
  );
};
export default EmptyPantryList;
