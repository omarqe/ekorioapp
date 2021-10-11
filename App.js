import React, { useState } from "react";
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
    const [signedIn, setSignedIn] = useState(true);
    const AuthProvider = Context.Auth.Provider;
    const toggleAuth = () => setSignedIn(!signedIn);

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ActionSheetProvider>
                <AuthProvider value={{ onLogin: toggleAuth, onLogout: toggleAuth }}>
                    <NavigationContainer>{signedIn ? <UIStacks.Authenticated /> : <UIStacks.Intro />}</NavigationContainer>
                </AuthProvider>
            </ActionSheetProvider>
        );
    }
}
