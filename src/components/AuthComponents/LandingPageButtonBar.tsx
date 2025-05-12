import { View } from "react-native";
import LandingPageButton from "./LandingPageButton";

const LandingPageButtonBar = () => {
  return (
    <View className="flex flex-row justify-between items-center h-[10%] px-5">
      <LandingPageButton destination="/LoginPage" text="Login" type="primary" />
      <LandingPageButton
        destination="/SignUpPage"
        text="Sign Up"
        type="secondary"
      />
    </View>
  );
};
export default LandingPageButtonBar;
