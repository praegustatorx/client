import { useContext, createContext, type PropsWithChildren, use } from "react";
import { type ReactNode } from "react";
import { useStorageState } from "./useStorageState";
import { useLoginMutation } from "../../hooks/mutations/useLoginMutation";
import { Alert } from "react-native";
import { router } from "expo-router";
import { ErrorResponse } from "@/src/api/api";
import { User } from "@/src/utils/Interfaces";

type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading?: boolean;
  user?: User | null;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [[isLoading, session], setSession] = useStorageState<string>("session");
  const [[userIsLoading, user], setUser] = useStorageState<User>("user");
  const LoginMutation = useLoginMutation();

  const signIn = (email: string, password: string) => {
    LoginMutation.mutate(
      { email, password },
      {
        onSuccess(data) {
          router.replace("/(app)/(tabs)");
          setUser({ email: data.loginUser.email, name: data.loginUser.name });
          setSession(data.token);
        },
        onError(error: ErrorResponse) {
          Alert.alert("Error", error.message);
        },
      }
    );
  };

  const signOut = () => {
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
};
