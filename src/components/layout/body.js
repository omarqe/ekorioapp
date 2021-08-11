import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const Body = ({ base = "white", flex = false, gray = false, topRounded = false, overlap = false, children }) => {
    let baseColor = { white: CT.BG_WHITE, gray: CT.BG_GRAY_50, purple: CT.BG_PURPLE_900 };
    let baseStyle = { ...styles.base, backgroundColor: baseColor[base] };

    if (flex) baseStyle = { ...baseStyle, flex: 1 }; // Add flex: 1 to baseStyle
    if (gray) baseStyle = { ...baseStyle, backgroundColor: baseColor.gray };
    if (topRounded) {
        baseStyle = {
            ...baseStyle,
            borderTopLeftRadius: CT.BODY_RADIUS,
            borderTopRightRadius: CT.BODY_RADIUS,
        };
        if (overlap) {
            baseStyle = {
                ...baseStyle,
                marginTop: typeof overlap === "boolean" ? -CT.BODY_RADIUS : overlap,
            };
        }
    }

    return <View style={baseStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    base: {
        width: "100%",
        padding: CT.VIEW_PADDING_X,
        backgroundColor: CT.BG_WHITE,
    },
});

Body.propTypes = {
    base: PropTypes.oneOf(["white", "gray", "purple"]),
    flex: PropTypes.bool,
    gray: PropTypes.bool,
    topRounded: PropTypes.bool,
    overlap: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default Body;
