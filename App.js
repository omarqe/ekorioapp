import React, { useState } from "react";
import Context from "./src/components/context";
import UIStacks from "./src/stacks";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";

library.add(fab, far, fal, fas);

export default function App() {
    const AuthProvider = Context.Auth.Provider;
    const [signedIn, setSignedIn] = useState(false);

    return (
        <ActionSheetProvider>
            <AuthProvider value={{ onLogin: setSignedIn }}>
                <NavigationContainer>{signedIn ? <UIStacks.Authenticated /> : <UIStacks.Intro />}</NavigationContainer>
            </AuthProvider>
        </ActionSheetProvider>
    );
}
