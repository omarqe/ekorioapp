import React from "react";
import IntroScreen from "./src/screens/intro";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Initialise stack navigator
const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen name="Intro" component={IntroScreen} options={screenOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
