import React from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Heading = (props) => {
    const { size = 0, text, subtitle } = props;
    const appendedProps = _omit(props, ["size", "text", "subtitle"]);
    const titleSizes = [20, 22, 24, 28, 32];
    const subtitleSizes = [14, 16, 18, 20, 24];

    let textStyle = { ...ss.text, fontSize: titleSizes[size] };
    let subtitleStyle = { ...ss.subtitle, fontSize: subtitleSizes[size] };

    return (
        <View {...appendedProps}>
            <Text style={textStyle}>{text}</Text>
            {subtitle && <Text style={subtitleStyle}>{subtitle}</Text>}
        </View>
    );
};

Heading.propTypes = {
    size: PropTypes.oneOf([0, 1, 2, 3, 4]),
    text: PropTypes.string,
    subtitle: PropTypes.string,
};

const ss = StyleSheet.create({
    text: {
        color: CT.BG_GRAY_900,
        fontWeight: "700",
    },
    subtitle: {
        color: CT.BG_GRAY_500,
    },
});

export default Heading;
