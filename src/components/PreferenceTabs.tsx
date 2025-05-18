import { useState } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AllergiesTab from "@/src/components/PreferencesTabsComponents/AllergiesTab";
import DietsTab from "@/src/components/PreferencesTabsComponents/DietsTab";
import BlacklistTab from "@/src/components/PreferencesTabsComponents/BlacklistTab";
import Colors from "@/src/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/src/providers/auth/AuthProvider";
import { fetchPreferences } from "@/src/api/api";
import { Preference } from "@/src/constants/Preferences";

const PreferencesTabs = () => {
  const insets = useSafeAreaInsets();
  const layout = Dimensions.get("window");

  const { user } = useSession();
  const { data, isLoading } = useQuery<Preference>({
    queryKey: ["preferences"],
    queryFn: () => fetchPreferences(user!.email),
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "allergies", title: "Allergies" },
    { key: "diets", title: "Diets" },
    { key: "blacklist", title: "Blacklist" },
  ]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>LOADING</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    allergies: () => <AllergiesTab allergies={data!.allergies} />,
    diets: () => <DietsTab diets={data!.diets} />,
    blacklist: () => <BlacklistTab blacklist={data!.blacklist} />,
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Preferences</Text>
      <Text style={styles.description}>
        Manage your dietary preferences to personalize your experience. Specify
        any allergies, diets you follow, and ingredients you'd like to avoid.
      </Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            tabStyle={styles.tab}
            activeColor={Colors.light.tint}
            inactiveColor="black"
            bounces
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
    marginHorizontal: 16,
  },
  tabBar: {
    backgroundColor: "#f9f9f9",
    margin: 10,
    borderRadius: 25,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  tab: {
    borderRadius: 12,
  },
  indicator: {
    backgroundColor: "none",
  },
});

export default PreferencesTabs;
