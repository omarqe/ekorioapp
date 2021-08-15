import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Badge = (props) => {
    let { style = {}, textStyle: labelStyle = {}, text, size = 1, xs = false, lg = false } = props;
    let baseStyle = styles.base;
    let textStyle = styles.text;

    // Handle size shortcuts
    if (xs) size = 0;
    else if (lg) size = 2;

    // Control badge appearance based on size
    switch (size) {
        case 0:
            baseStyle = { ...baseStyle, padding: 4, paddingLeft: 5, paddingRight: 6, borderRadius: 6 };
            textStyle = { ...textStyle, fontSize: 12 };
            break;
        case 1:
            baseStyle = { ...baseStyle, padding: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 7 };
            textStyle = { ...textStyle, fontSize: 14 };
            break;
        case 2:
            baseStyle = { ...baseStyle, padding: 6, paddingLeft: 7, paddingRight: 7, borderRadius: 8 };
            textStyle = { ...textStyle, fontSize: 16 };
            break;
    }

    return (
        <View style={[baseStyle, style]}>
            <Text style={[textStyle, labelStyle]}>{text}</Text>
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
    textStyle: PropTypes.object,
};

export default Badge;
