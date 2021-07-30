import React from "react";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

const Container = ({ children, style = {}, paddingX = 25, statusBarStyle = "light" }) => {
    const containerStyle = {
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
    statusBarStyle: PropTypes.string,
};

const ss = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
});

export default Container;
