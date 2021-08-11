import React from "react";
import CT from "../const";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Menu Icons
import MeIcon from "./assets/icons/user-circle.svg";
import SpaceCatIcon from "./assets/icons/cat-space.svg";
import HospitalIcon from "./assets/icons/hospital.svg";
import CalendarIcon from "./assets/icons/calendar-alt.svg";
import MeIconActive from "./assets/icons/user-circle__active.svg";
import SpaceCatIconActive from "./assets/icons/cat-space__active.svg";
import HospitalIconActive from "./assets/icons/hospital__active.svg";
import CalendarIconActive from "./assets/icons/calendar-alt__active.svg";

// Navigation Stacks
import HomeStackScreen from "./src/stacks/home";

const Tab = createBottomTabNavigator();
export default {
    Inner: () => {
        const tabs = [
            { name: "home", component: HomeStackScreen },
            { name: "veterinars", component: HomeStackScreen },
            { name: "appointments", component: HomeStackScreen },
            { name: "me", component: HomeStackScreen },
        ];
        const screenOptions = ({ route }) => ({
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
                    fontWeight: "500",
                    textTransform: "capitalize",
                };
                return <Text style={style}>{route?.name}</Text>;
            },
            tabBarStyle: {
                height: CT.IS_IOS ? 90 : 80,
            },
            tabBarItemStyle: {
                paddingTop: CT.IS_IOS ? 0 : 15,
                paddingBottom: CT.IS_IOS ? 0 : 15,
            },
        });

        return (
            <Tab.Navigator screenOptions={screenOptions}>
                {tabs.map((props, i) => (
                    <Tab.Screen key={i} {...props} />
                ))}
            </Tab.Navigator>
        );
    },
};
