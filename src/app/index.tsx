import { Link, Redirect } from "expo-router";

import { useAuth } from "../providers/AuthProvider";
const Index = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={"/(app)"} />;
  } else {
    return <Redirect href={"/(auth)"} />;
  }
};

export default Index;
