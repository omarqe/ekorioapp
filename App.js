import React from "react";
import CT from "./src/const";

import IntroScreen from "./src/screens/intro";
import SigninScreen from "./src/screens/intro/signin";
import SignupScreen from "./src/screens/intro/signup";
import SignupVerifyScreen from "./src/screens/intro/signup-verify";

import HomeScreen from "./src/screens/home";
import HomeStackScreen from "./src/stacks/home";

// Menu icon SVGs
import MeIcon from "./assets/icons/user-circle.svg";
import SpaceCatIcon from "./assets/icons/cat-space.svg";
import HospitalIcon from "./assets/icons/hospital.svg";
import CalendarIcon from "./assets/icons/calendar-alt.svg";
import MeIconActive from "./assets/icons/user-circle__active.svg";
import SpaceCatIconActive from "./assets/icons/cat-space__active.svg";
import HospitalIconActive from "./assets/icons/hospital__active.svg";
import CalendarIconActive from "./assets/icons/calendar-alt__active.svg";

// Screen navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Action sheet
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

// FontAwesome configuration
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
library.add(fab, far, fal, fas);

// Initialise stack & tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import { View, Text } from "react-native";

export default function App() {
    const screens = [
        { name: "intro", component: IntroScreen },
        { name: "signin", component: SigninScreen },
        { name: "signup", component: SignupScreen },
        { name: "signup-verify", component: SignupVerifyScreen },
        { name: "home", component: HomeScreen },
    ];

    const tabs = [
        { name: "home", component: HomeStackScreen },
        { name: "veterinars", component: HomeStackScreen },
        { name: "appointments", component: HomeStackScreen },
        { name: "me", component: HomeStackScreen },
    ];

    return (
        <ActionSheetProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            const icons = {
                                home: [SpaceCatIcon, SpaceCatIconActive],
                                veterinars: [HospitalIcon, HospitalIconActive],
                                appointments: [CalendarIcon, CalendarIconActive],
                                me: [MeIcon, MeIconActive],
                            };

                            const Icon = icons[route?.name][focused ? 1 : 0];
                            return <Icon />;
                        },
                        tabBarLabel: ({ focused }) => {
                            const style = {
                                color: focused ? CT.BG_PURPLE_500 : CT.BG_GRAY_500,
                                fontSize: 12,
                                fontWeight: focused ? "600" : "500",
                                textTransform: "capitalize",
                            };
                            return <Text style={style}>{route?.name}</Text>;
                        },
                        tabBarStyle: {
                            height: 90,
                            borderColor: CT.BG_BLACK,
                        },
                    })}
                >
                    {tabs.map((props, i) => (
                        <Tab.Screen key={i} {...props} />
                    ))}
                </Tab.Navigator>

                {/* <Stack.Navigator activeIndex={2} screenOptions={{ headerShown: false }} initialRouteName="intro">
                    {screens.map((props, i) => (
                        <Stack.Screen key={i} {...props} />
                    ))}
                </Stack.Navigator> */}
            </NavigationContainer>
        </ActionSheetProvider>
    );
}
