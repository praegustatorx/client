import { useContext, createContext, type PropsWithChildren } from "react";
import { type ReactNode } from "react";
import { useStorageState } from "./useStorageState";
import { useLoginMutation } from "../../hooks/mutations/useLoginMutation";
import { Alert } from "react-native";
import { router } from "expo-router";
import { ErrorResponse } from "@/src/api/api";

type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading?: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [[isLoading, session], setSession] = useStorageState("session");
  const LoginMutation = useLoginMutation();

  const signIn = (email: string, password: string) => {
    setSession("sui");
    router.push("/(app)");
    LoginMutation.mutate(
      { email, password },
      {
        onSuccess(data) {
          setSession(data.token);
          router.push("/(app)");
        },
        onError(error: ErrorResponse) {
          Alert.alert("Error", error.message);
        },
      }
    );
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
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
