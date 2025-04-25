import { View, SafeAreaView } from "react-native";
import { Text, View as StyledView } from "@/src/components/Themed";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="h-[100%]">
      <View className="flex-1 px-3">
        <Text className="text-3xl font-extrabold">My Recipes</Text>
      </View>
    </SafeAreaView>
  );
}
