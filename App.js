import React, { useState, useEffect } from "react";
import http from "./src/functions/http";
import store from "./src/functions/store";
import Context from "./src/components/context";
import UIStacks from "./src/stacks";
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from "react-native-root-siblings";
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
    const [uid, setUID] = useState(0);
    const [token, setToken] = useState({ token: null, csrf: null });
    const [authed, setAuthed] = useState(false);
    const AuthProvider = Context.Auth.Provider;

    // We should check the auth token over here
    useEffect(() => {
        Promise.all([store.get("token"), store.get("csrf"), store.get("uid")]).then(([token, csrf, id]) => {
            if (token?.length > 0) {
                setUID(id);
                setToken({ token, csrf });
                setAuthed(true);
            }
        });
    }, [authed]);

    useEffect(() => {
        let authInterceptor = null;
        if (token?.token !== null) {
            authInterceptor = http.interceptors.request.use((config) => {
                const headers = { ...config.headers, Authorization: `Bearer ${token?.token}`, "X-CSRF-Token": token?.csrf };
                return { ...config, headers };
            });
        }
        return () => http.interceptors.request.eject(authInterceptor);
    }, [token]);

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <RootSiblingParent>
                <ActionSheetProvider>
                    <AuthProvider value={{ uid, setUID, setToken, setAuthed }}>
                        <NavigationContainer>{authed ? <UIStacks.Authenticated /> : <UIStacks.Intro />}</NavigationContainer>
                    </AuthProvider>
                </ActionSheetProvider>
            </RootSiblingParent>
        );
    }
}
