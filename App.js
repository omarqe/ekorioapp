import React from "react";
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
    return (
        <ActionSheetProvider>
            <NavigationContainer>
                <UIStacks.Inner />
            </NavigationContainer>
        </ActionSheetProvider>
    );
}
