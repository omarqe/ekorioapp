import React from "react";
import CT from "../const";
import Text from "./text";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const Badge = (props) => {
    let { style = {}, textStyle = {} } = props;
    let { text, size = 1, xs = false, lg = false, color = "default" } = props;

    // Handle size shortcuts
    if (xs) size = 0;
    else if (lg) size = 2;

    const sizes = [
        {
            base: { padding: 4, paddingLeft: 5, paddingRight: 6, borderRadius: 6 },
            text: { fontSize: 10 },
        },
        {
            base: { padding: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 7 },
            text: { fontSize: 12 },
        },
        {
            base: { padding: 6, paddingLeft: 7, paddingRight: 7, borderRadius: 8 },
            text: { fontSize: 14 },
        },
    ];
    const colors = {
        red: { base: { backgroundColor: "#FE8F8F" }, text: { color: "#8D2828" } },
        green: { base: { backgroundColor: "#B1E693" }, text: { color: "#3E7C17" } },
        purple: { base: { backgroundColor: CT.BG_PURPLE_500 }, text: { color: CT.BG_PURPLE_100 } },
        yellow: { base: { backgroundColor: CT.BG_YELLOW_500 }, text: { color: CT.BG_YELLOW_900 } },
    };

    return (
        <View style={[styles.base, sizes[size]?.base, colors[color]?.base, style]}>
            <Text style={[styles.text, sizes[size]?.text, colors[color]?.text, textStyle]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: CT.BG_GRAY_100,
    },
    text: {
        color: CT.BG_GRAY_600,
        fontWeight: "700",
    },
});

Badge.propTypes = {
    xs: PropTypes.bool,
    lg: PropTypes.bool,
    size: PropTypes.number,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    color: PropTypes.oneOf(["default", "purple", "yellow", "green", "red"]),
    textStyle: PropTypes.object,
};

export default Badge;
