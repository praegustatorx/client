import { SafeAreaView } from "react-native";
import BaseButton from "@/src/components/BaseButton";
import { router } from "expo-router";

const DevDashBoard = () => {
  return (
    <SafeAreaView className="h-[100%]">
      <BaseButton
        variant="primary"
        onPress={() => {
          router.push("/(app)/(camera)");
        }}
      >
        Open Camera
      </BaseButton>
    </SafeAreaView>
  );
};
export default DevDashBoard;
