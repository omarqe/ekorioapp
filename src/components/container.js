import React from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

const Container = (props) => {
    let { children, style, isLogin = false, bgColor = CT.BG_WHITE, paddingX = 0, statusBarStyle = "light" } = props;
    let containerStyle = {
        paddingLeft: paddingX,
        paddingRight: paddingX,
        backgroundColor: bgColor,
        ...ss.container,
        ...style,
    };

    // Default configuration for login container
    if (isLogin) {
        containerStyle = {
            paddingTop: CT.VIEW_PADDING_TOP,
            ...containerStyle,
        };
    }

    return (
        <View style={containerStyle}>
            <StatusBar style={statusBarStyle} />
            {children}
        </View>
    );
};

Container.propTypes = {
    style: PropTypes.object,
    isLogin: PropTypes.bool,
    bgColor: PropTypes.string,
    paddingX: PropTypes.number,
    statusBarStyle: PropTypes.oneOf(["auto", "dark", "inverted", "light"]),
};

const ss = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Container;
