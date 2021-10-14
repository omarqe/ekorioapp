import React, { useState } from "react";
import http from "./src/functions/http";
import store from "./src/functions/store";
import Context from "./src/components/context";
import UIStacks from "./src/stacks";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";

library.add(fab, far, fal, fas);

export default function App() {
    const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
    const [authed, setAuthed] = useState(false);
    const AuthProvider = Context.Auth.Provider;

    // We should check the auth token over here
    store.get("token").then((token) => {
        if (token?.length > 0) {
            setAuthed(true);
            http.interceptors.request.use((config) => {
                const headers = { ...config.headers, Authorization: `Bearer ${token}` };
                return { ...config, headers };
            });
        }
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ActionSheetProvider>
                <AuthProvider value={{ setAuthed }}>
                    <NavigationContainer>{authed ? <UIStacks.Authenticated /> : <UIStacks.Intro />}</NavigationContainer>
                </AuthProvider>
            </ActionSheetProvider>
        );
    }
}
