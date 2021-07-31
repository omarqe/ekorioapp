import React from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

const Container = ({ children, style = {}, paddingX = 25, background = CT.BG_WHITE, statusBarStyle = "light" }) => {
    let containerStyle = {
        background,
        paddingLeft: paddingX,
        paddingRight: paddingX,
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
    paddingX: PropTypes.number,
    background: PropTypes.string,
    statusBarStyle: PropTypes.string,
};

const ss = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
});

export default Container;
