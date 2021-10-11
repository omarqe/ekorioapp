import React from "react";
import CT from "../const.js";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";

const Container = (props) => {
    let { style, light, bgColor = CT.BG_WHITE, paddingX = 0, statusBarStyle = "light", spinnerBoxStyle } = props;
    const { children, loading = false, isLogin = false } = props;

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
            {loading && (
                <View style={styles.overlay}>
                    <View style={[styles.spinnerBox, spinnerBoxStyle]}>
                        <ActivityIndicator style={styles.spinner} color={CT.CTA_POSITIVE} />
                    </View>
                </View>
            )}
        </React.Fragment>
    );
};

Container.propTypes = {
    safeTop: PropTypes.oneOf(["dark", "light"]), // for SafeAreaView
    safeBottom: PropTypes.oneOf(["dark", "light"]), // for SafeAreaView

    style: PropTypes.object,
    loading: PropTypes.bool,
    isLogin: PropTypes.bool,
    bgColor: PropTypes.string,
    paddingX: PropTypes.number,
    statusBarStyle: PropTypes.oneOf(["auto", "dark", "inverted", "light"]),
    spinnerBoxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinner: {},
    spinnerBox: {
        padding: 20,
        marginTop: 80,
        borderRadius: CT.BODY_RADIUS,
        backgroundColor: CT.BG_WHITE,
        ...CT.SHADOW_LG,
    },
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,.4)",
    },
});

export default Container;
