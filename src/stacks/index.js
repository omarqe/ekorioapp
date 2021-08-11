import React from "react";
import CT from "../const";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Menu Icons
import MeIcon from "../../assets/icons/user-circle.svg";
import MeIconActive from "../../assets/icons/user-circle__active.svg";
import SpaceCatIcon from "../../assets/icons/space-cat.svg";
import SpaceCatIconActive from "../../assets/icons/space-cat__active.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import CalendarIconActive from "../../assets/icons/calendar__active.svg";
import HospitalIcon from "../../assets/icons/hospital.svg";
import HospitalIconActive from "../../assets/icons/hospital__active.svg";
// import BellsIcon from "../../assets/icons/bells.svg";
// import BellsIconActive from "../../assets/icons/bells__active.svg";

// Navigation Stacks
import HomeStacks from "./stacks-home";
import VeterinarStacks from "./stacks-veterinar";
import AppointmentStacks from "./stacks-appointment";
import MeStacks from "./stacks-me";

import _find from "lodash/find";

const Tab = createBottomTabNavigator();
export default {
    Authenticated: () => {
        const { tabBarStyle, tabBarItemStyle } = ss;
        const tabs = [
            {
                name: "home_stacks",
                label: "My Pets",
                icons: [SpaceCatIcon, SpaceCatIconActive],
                component: HomeStacks,
            },
            {
                name: "veterinar_stacks",
                label: "Find Vets",
                icons: [HospitalIcon, HospitalIconActive],
                component: VeterinarStacks,
            },
            {
                name: "appointment_stacks",
                label: "Appointments",
                icons: [CalendarIcon, CalendarIconActive],
                component: AppointmentStacks,
            },
            {
                name: "me_stacks",
                label: "Me",
                icons: [MeIcon, MeIconActive],
                component: MeStacks,
            },
        ];

        const screenOptions = ({ route }) => ({
            headerShown: false,
            tabBarStyle,
            tabBarItemStyle,
            tabBarIcon: ({ focused }) => {
                const Icon = _find(tabs, ["name", route?.name]).icons[focused ? 1 : 0];
                return (
                    <View style={ss.iconContainer}>
                        {focused && <View style={ss.iconShadow} />}
                        <Icon />
                    </View>
                );
            },
            tabBarLabel: ({ focused }) => {
                const label = _find(tabs, (o) => o.name === route?.name).label ?? route?.name;
                const labelStyle = { ...ss.label, color: focused ? CT.BG_PURPLE_500 : CT.BG_GRAY_500 };
                return <Text style={labelStyle}>{label}</Text>;
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

const ss = StyleSheet.create({
    label: {
        fontSize: 12,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    tabBarStyle: {
        height: CT.IS_IOS ? 90 : 80,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tabBarItemStyle: {
        paddingTop: CT.IS_IOS ? 0 : 8,
        paddingBottom: CT.IS_IOS ? 0 : 15,
    },
    iconShadow: {
        top: 5,
        width: 25,
        height: 25,
        position: "absolute",
        borderRadius: 25,
        backgroundColor: CT.BG_PURPLE_100,
    },
    iconContainer: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
});
