import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const Body = ({ base = "white", flex = true, children }) => {
    let baseColor = { white: CT.BG_WHITE, gray: CT.BG_GRAY_50, purple: CT.BG_PURPLE_900 };
    let baseStyle = { ...ss.base, backgroundColor: baseColor[base] };

    if (flex) baseStyle = { ...baseStyle, flex: 1 }; // Add flex: 1 to baseStyle

    return <View style={baseStyle}>{children}</View>;
};

Body.propTypes = {
    base: PropTypes.oneOf(["white", "gray", "purple"]),
    flex: PropTypes.bool,
};

const ss = StyleSheet.create({
    base: {
        width: "100%",
        padding: CT.VIEW_PADDING_X,
        marginTop: -CT.BODY_RADIUS,
        backgroundColor: CT.BG_WHITE,
        borderTopLeftRadius: CT.BODY_RADIUS,
        borderTopRightRadius: CT.BODY_RADIUS,
    },
});

export default Body;
