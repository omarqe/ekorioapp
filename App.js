import React from "react";
import IntroScreen from "./src/screens/intro";
import SignupScreen from "./src/screens/signup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// FontAwesome configuration
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
library.add(fab, far, fal, fas);

// Initialise stack navigator
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="intro">
                <Stack.Screen name="intro" component={IntroScreen} options={screenOptions} />
                <Stack.Screen name="signup" component={SignupScreen} options={{ ...screenOptions }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
