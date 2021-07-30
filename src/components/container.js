import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

export default function Container({ children, style = {}, paddingX = 25, statusBarStyle = "light" }) {
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
}

const ss = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
});
