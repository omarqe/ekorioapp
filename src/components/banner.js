import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export default function Banner({ style, wrapperStyle, children }) {
    return (
        <View style={[styles.wrapper, wrapperStyle]}>
            <View style={[styles.foreground, style]}>{children}</View>
        </View>
    );
}

const height = 50;
const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        minHeight: height,
        borderRadius: 15,
        paddingBottom: 5,
        backgroundColor: CT.BG_GRAY_50,
        ...CT.SHADOW_LG,
    },
    foreground: {
        ...CT.SHADOW_SM,
        width: "100%",
        padding: 15,
        minHeight: height,
        borderRadius: 15,
        shadowRadius: 5,
        shadowOpacity: 0.01,
        backgroundColor: CT.BG_WHITE,
    },
});

Banner.propTypes = {
    style: PropTypes.object,
    wrapperStyle: PropTypes.object,
};
