import React from "react";
import IntroScreen from "./src/screens/intro";
import SignUpScreen from "./src/screens/signup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Initialise stack navigator
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="intro">
                <Stack.Screen name="intro" component={IntroScreen} options={screenOptions} />
                <Stack.Screen name="signup" component={SignUpScreen} options={{ ...screenOptions }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
