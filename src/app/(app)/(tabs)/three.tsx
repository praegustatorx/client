import { SafeAreaView } from "react-native";
import { View } from "react-native";
import { Text } from "@/src/components/Themed";
import BaseButton from "@/src/components/BaseButton";
import { useSession } from "@/src/providers/auth/AuthProvider";

const Three = () => {
  const { signOut } = useSession();
  return (
    <SafeAreaView className="h-[100%]">
      <View className="flex-1 px-3">
        <Text className="text-3xl font-extrabold">Hello, </Text>
        <BaseButton
          onPress={() => signOut()}
          variant="primary"
          size="sm"
          testID="sign-up-button"
        >
          Log Out
        </BaseButton>
      </View>
    </SafeAreaView>
  );
};
export default Three;
