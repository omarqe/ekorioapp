import React from "react";
import IntroScreen from "./src/screens/intro";
import SigninScreen from "./src/screens/intro/signin";
import SignupScreen from "./src/screens/intro/signup";
import SignupVerifyScreen from "./src/screens/intro/signup-verify";

import HomeScreen from "./src/screens/home";

// Screen navigation
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
    const screens = [
        { name: "intro", component: IntroScreen },
        { name: "signin", component: SigninScreen },
        { name: "signup", component: SignupScreen },
        { name: "signup-verify", component: SignupVerifyScreen },
        { name: "home", component: HomeScreen },
    ];

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                {screens.map((props, i) => (
                    <Stack.Screen key={i} {...props} options={screenOptions} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
