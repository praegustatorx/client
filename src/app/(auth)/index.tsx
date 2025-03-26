import { Link, Redirect } from "expo-router";
import { StyleSheet, Button } from "react-native";
import { View, Text } from "../../components/Themed";

const Index = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <Link href={"/LoginPage"} asChild>
          <Button title="Login" />
        </Link>
        <Link href={"/SignUpPage"} asChild>
          <Button title="Sign Up" />
        </Link>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    height: 90,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "white",
  },
});
