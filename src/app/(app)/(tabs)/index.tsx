import { Text, View as StyledView } from "@/src/components/Themed";
import { View, SafeAreaView } from "react-native";
import { useSession } from "@/src/providers/auth/AuthProvider";

export default function TabOneScreen() {
  const { signOut } = useSession();

  return (
    <SafeAreaView className="h-[100%]">
      <View className="flex-1 px-3">
        <Text className="text-3xl font-extrabold">Pantry</Text>
      </View>
    </SafeAreaView>
  );
}
