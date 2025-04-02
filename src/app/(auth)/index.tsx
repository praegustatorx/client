import { Link, Redirect } from "expo-router";
import { StyleSheet, Button } from "react-native";
import { Text } from "../../components/Themed";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView className="flex flex-col h-full justify-end">
      <View className="flex flex-col justify-center items-center h-[85%]">
        <Text> introductory carousel </Text>
      </View>
      <View className="flex flex-row justify-between items-center h-[10%] px-5">
        <Link href={"/LoginPage"} asChild>
          <Button title="Login" />
        </Link>
        <Link href={"/SignUpPage"} asChild>
          <Button title="Sign Up" />
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Index;

