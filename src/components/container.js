import React from "react";
import CT from "../const.js";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, StyleSheet } from "react-native";

const Container = (props) => {
    let { children, style, light, isLogin = false, bgColor = CT.BG_WHITE, paddingX = 0, statusBarStyle = "light" } = props;

    let safeAreaStyle = { flex: 1, backgroundColor: light ? CT.BG_WHITE : CT.BG_PURPLE_900 };
    let containerStyle = {
        paddingLeft: paddingX,
        paddingRight: paddingX,
        backgroundColor: bgColor,
        ...styles.container,
        ...style,
    };

    // Default configuration for login container
    if (isLogin) {
        containerStyle = {
            paddingTop: CT.VIEW_PADDING_TOP,
            ...containerStyle,
        };
    }

    let { safeTop = "dark", safeBottom = "light" } = props;
    const safeAreaTop = { flex: 0, backgroundColor: safeTop === "light" ? CT.BG_WHITE : CT.BG_PURPLE_900 };
    const safeAreaBottom = { flex: 1, backgroundColor: safeBottom === "light" ? CT.BG_WHITE : CT.BG_PURPLE_900 };

    return (
        <React.Fragment>
            <SafeAreaView style={safeAreaTop} />
            <SafeAreaView style={safeAreaBottom}>
                <View style={containerStyle}>
                    <StatusBar style={statusBarStyle} />
                    {children}
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

Container.propTypes = {
    safeTop: PropTypes.oneOf(["dark", "light"]), // for SafeAreaView
    safeBottom: PropTypes.oneOf(["dark", "light"]), // for SafeAreaView

    style: PropTypes.object,
    isLogin: PropTypes.bool,
    bgColor: PropTypes.string,
    paddingX: PropTypes.number,
    statusBarStyle: PropTypes.oneOf(["auto", "dark", "inverted", "light"]),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Container;
