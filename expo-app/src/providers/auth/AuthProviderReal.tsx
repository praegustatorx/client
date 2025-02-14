import { useContext, createContext, type PropsWithChildren } from "react";
import { type ReactNode } from "react";
import { useStorageState } from "./useStorageState";

type AuthContextType = {
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading?: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [[isLoading, session], setSession] = useStorageState('session');

    const signIn = () => {
        console.log('Signing in...');
        // login logic here :3
        setSession('session');
    }

    const signOut = () => {
        console.log('Signing out...');
        setSession(null);
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useSession = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return value;
}