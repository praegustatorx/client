import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, Text, View } from "react-native";
import { useState } from "react";
import { dummyPreferences } from "@/src/utils/DummyData/dummyPreferences";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AllergiesTab from "./AllergiesTab";

const PreferencesTabs = () => {
  const insets = useSafeAreaInsets();
  const layout = Dimensions.get("window");
  const data = dummyPreferences;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "allergies", title: "Allergies" },
    { key: "diets", title: "Diets" },
    { key: "blacklist", title: "Blacklist" },
  ]);

  const renderScene = SceneMap({
    allergies: () => <AllergiesTab data={data} />,
    diets: () => <DietsTab data={data} />,
    blacklist: () => <BlacklistTab data={data} />,
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
            indicatorStyle={{ backgroundColor: "green" }}
            // labelStyle={{ color: "black", fontWeight: "600" }}
          />
        )}
      />
    </View>
  );
};

export default PreferencesTabs;
