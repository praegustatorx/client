import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://localhost:8005",
    plugins: [
        expoClient({
            scheme: 'myapp',
            storagePrefix: 'myapp',
            storage: SecureStore,
        }) as any
    ]
}); 