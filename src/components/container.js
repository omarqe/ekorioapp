import React from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

const Container = ({ children, style = {}, paddingX = 25, bgColor = CT.BG_WHITE, statusBarStyle = "light" }) => {
    let containerStyle = {
        paddingLeft: paddingX,
        paddingRight: paddingX,
        backgroundColor: bgColor,
        ...ss.container,
        ...style,
    };

    return (
        <View style={containerStyle}>
            <StatusBar style={statusBarStyle} />
            {children}
        </View>
    );
};

Container.propTypes = {
    style: PropTypes.object,
    bgColor: PropTypes.string,
    paddingX: PropTypes.number,
    statusBarStyle: PropTypes.string,
};

const ss = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
});

export default Container;
