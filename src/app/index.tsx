import { Redirect } from "expo-router";

import { useSession } from "../providers/auth/AuthProvider";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

//the default behavior of the splash screen is to hide when the app is loaded
//instead we manually hide it when the session is loaded. neat :)

// we may wanna load more stuff in the future like fonts or images, this can happen here too
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (session) {
    return <Redirect href={"/(app)"} />;
  } else {
    return <Redirect href={"/(auth)"} />;
  }
};

export default Index;
