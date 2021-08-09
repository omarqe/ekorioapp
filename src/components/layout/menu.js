import React from "react";
import CT from "../../const.json";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import SpaceCat from "../../../assets/icons/cat-space.svg";
import Hospital from "../../../assets/icons/hospital.svg";
import Calendar from "../../../assets/icons/calendar-alt.svg";
import User from "../../../assets/icons/user-circle.svg";

import SpaceCatActive from "../../../assets/icons/cat-space__active.svg";
import HospitalActive from "../../../assets/icons/hospital__active.svg";
import CalendarActive from "../../../assets/icons/calendar-alt__active.svg";
import UserActive from "../../../assets/icons/user-circle__active.svg";

const Menu = ({ active = 0 }) => {
    const menu = [
        { label: "Home", icon: SpaceCat, iconActive: SpaceCatActive },
        { label: "Veterinars", icon: Hospital, iconActive: HospitalActive },
        { label: "Appointments", icon: Calendar, iconActive: CalendarActive },
        { label: "Me", icon: User, iconActive: UserActive },
    ];

    let activeLabel = {};

    return (
        <View style={ss.menu}>
            {menu.map(({ label, icon, iconActive }, i) => {
                const isActive = active === i;
                const MenuIcon = isActive ? iconActive : icon;
                const labelStyle = isActive ? { ...ss.label, color: CT.BG_PURPLE_500, fontWeight: "600" } : ss.label;

                return (
                    <TouchableWithoutFeedback key={i} style={ss.item}>
                        <View style={ss.itemContent}>
                            <View style={ss.iconContainer}>
                                {isActive && <View style={ss.iconShadow} />}
                                <MenuIcon style={ss.icon} />
                            </View>
                            <Text style={labelStyle}>{label}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
};

Menu.propTypes = {
    active: PropTypes.number,
};

const ss = StyleSheet.create({
    menu: {
        width: "100%",
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",

        borderTopWidth: 1,
        borderTopColor: CT.BG_GRAY_100,
        backgroundColor: CT.BG_WHITE,
    },
    item: {},
    itemContent: {
        height: "100%",
        minWidth: 80,
    },
    label: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        textAlign: "center",
    },
    icon: {
        position: "relative",
    },
    iconShadow: {
        top: 18,
        width: 25,
        height: 25,
        position: "absolute",
        borderRadius: 25,
        backgroundColor: CT.BG_PURPLE_100,
    },
    iconContainer: {
        position: "relative",
        width: "100%",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Menu;
