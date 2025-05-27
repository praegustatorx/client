import PreferencesTabs from "@/src/components/PreferenceTabs";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import BaseButton from "@/src/components/BaseButton";
import { useSession } from "@/src/providers/auth/AuthProvider";
import TabTitle from "@/src/components/Shared/TabTitle";

const three = () => {
  const { signOut, user } = useSession();
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <TabTitle text={`Hello, ${user?.name}`} />
        <PreferencesTabs />

        {/* Divider */}
        <View style={styles.divider} />

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

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
});

export default three;
