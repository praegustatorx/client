import { useState } from "react";
import { View, Dimensions, Text } from "react-native";
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
  console.log("user", user);
  ``;
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
      <View>
        <Text> LOADING </Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    allergies: () => <AllergiesTab allergies={data!.allergies} />,
    diets: () => <DietsTab diets={data!.diets} />,
    blacklist: () => <BlacklistTab blacklist={data!.blacklist} />,
  });
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text className="text-xl font-bold text-center mt-4">Preferences</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "none" }}
            style={{
              backgroundColor: "#f9f9f9",
              margin: 10,
              borderRadius: 25,

              shadowColor: Colors.light.tint,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 5,
            }}
            tabStyle={{
              borderRadius: 12,
            }}
            activeColor={Colors.light.tint}
            inactiveColor="black"
            bounces
          />
        )}
      />
    </View>
  );
};

export default PreferencesTabs;
