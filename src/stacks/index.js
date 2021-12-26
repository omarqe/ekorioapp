import React from "react";
import CT from "../const";
import Text from "../components/text";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Menu Icons
import AccountIcon from "../../assets/icons/user-circle.svg";
import AccountIconActive from "../../assets/icons/user-circle__active.svg";
import SpaceCatIcon from "../../assets/icons/space-cat.svg";
import SpaceCatIconActive from "../../assets/icons/space-cat__active.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import CalendarIconActive from "../../assets/icons/calendar__active.svg";
import BellIcon from "../../assets/icons/bell.svg";
import BellIconActive from "../../assets/icons/bell__active.svg";
// import HospitalIcon from "../../assets/icons/hospital.svg";
// import HospitalIconActive from "../../assets/icons/hospital__active.svg";

// Navigation Stacks
import HomeStacks from "./stacks-home";
import CameraScreen from "../screens/camera";
import NotificationScreen from "../screens/home/notification";
// import VeterinarStacks from "./stacks-veterinar";
import AppointmentStacks from "./stacks-appointment";
import AccountStacks from "./stacks-account";

// Intro Screens
import IntroScreen from "../screens/intro";
import SigninScreen from "../screens/intro/signin";
import SignupScreen from "../screens/intro/signup";
import SignupVerifyScreen from "../screens/intro/signup-verify";

import _find from "lodash/find";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default {
    Intro: () => {
        const options = { headerShown: false };
        const screens = [
            { name: "intro", component: IntroScreen },
            { name: "signin", component: SigninScreen, options: { animationTypeForReplace: "push" } },
            { name: "signup", component: SignupScreen },
            { name: "signup-verify", component: SignupVerifyScreen, options: { animationTypeForReplace: "push" } },
        ];

        return (
            <Stack.Navigator>
                {screens.map((props, i) => (
                    <Stack.Screen key={i} {...props} options={{ ...options, ...props?.options }} />
                ))}
            </Stack.Navigator>
        );
    },

    Authenticated: () => {
        const { tabBarStyle, tabBarItemStyle } = styles;
        const tabs = [
            {
                name: "home_stacks",
                label: "My Pets",
                icons: [SpaceCatIcon, SpaceCatIconActive],
                component: HomeStacks,
            },
            // {
            //     name: "veterinar_stacks",
            //     label: "Find Vets",
            //     icons: [HospitalIcon, HospitalIconActive],
            //     component: VeterinarStacks,
            // },
            {
                name: "appointment_stacks",
                label: "Appointments",
                icons: [CalendarIcon, CalendarIconActive],
                component: AppointmentStacks,
            },
            {
                name: "notification",
                label: "Notifications",
                icons: [BellIcon, BellIconActive],
                component: NotificationScreen,
            },
            {
                name: "me_stacks",
                label: "Me",
                icons: [AccountIcon, AccountIconActive],
                component: AccountStacks,
            },
        ];

        const headerShown = false;
        const shadowSize = CT.LOW_RESOLUTION ? 23 : 25;
        const screenOptions = ({ route }) => ({
            headerShown,
            tabBarStyle,
            tabBarItemStyle,
            tabBarIcon: ({ focused }) => {
                const Icon = _find(tabs, ["name", route?.name]).icons[focused ? 1 : 0];
                return (
                    <View style={styles.iconContainer}>
                        {focused && <View style={[styles.iconShadow, { width: shadowSize, height: shadowSize }]} />}
                        <Icon height={CT.LOW_RESOLUTION ? 22 : 24} />
                    </View>
                );
            },
            tabBarLabel: ({ focused }) => {
                const label = _find(tabs, (o) => o.name === route?.name).label ?? route?.name;
                const labelStyle = { ...styles.label, color: focused ? CT.BG_PURPLE_500 : CT.BG_GRAY_500 };
                return <Text style={labelStyle}>{label}</Text>;
            },
        });

        const AuthenticatedTabs = () => (
            <Tab.Navigator screenOptions={screenOptions}>
                {tabs.map((props, i) => (
                    <Tab.Screen key={i} {...props} />
                ))}
            </Tab.Navigator>
        );

        return (
            <Stack.Navigator>
                <Stack.Screen name="authtabs" component={AuthenticatedTabs} options={{ headerShown }} />
                <Stack.Screen name="camera" component={CameraScreen} options={{ headerShown }} />
            </Stack.Navigator>
        );
    },
};

const styles = StyleSheet.create({
    label: {
        fontSize: 10,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    tabBarStyle: {
        height: CT.IS_IOS ? 90 : 80,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tabBarItemStyle: {
        paddingTop: CT.IS_IOS ? 5 : 8,
        paddingBottom: CT.IS_IOS ? 0 : 15,
    },
    iconShadow: {
        top: 5,
        width: 25,
        height: 25,
        position: "absolute",
        borderRadius: 25,
        backgroundColor: CT.BG_PURPLE_50,
    },
    iconContainer: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
});
