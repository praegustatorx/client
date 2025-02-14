import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function AuthPagesLayout() {
    const session = false; //auth is going to be here eventually
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Redirect href='/(app)' />
    }

    return <Slot />
}
