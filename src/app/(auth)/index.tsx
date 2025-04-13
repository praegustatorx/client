import { Link, Redirect } from "expo-router";
import { StyleSheet, Button } from "react-native";
import { Text } from "../../components/Themed";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WavyBackground from "@/src/components/WaveBackground";
import IntroductionCarousel from "@/src/components/IntroductionCarousel/IntroductionCarousel";
import LandingPageButtonBar from "@/src/components/authComponents/LandingPageButtonBar";

const Index = () => {
  return (
    <SafeAreaView className="flex flex-col h-full justify-end">
      <WavyBackground />
      <IntroductionCarousel />
      <LandingPageButtonBar />
    </SafeAreaView>
  );
};

export default Index;
