import React from "react";
import CT from "../const.js";
import Badge from "./badge";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Heading = (props) => {
    const { size = 0, text, badge = null, subtitle } = props;
    const appendedProps = _omit(props, ["size", "text", "subtitle"]);
    const titleSizes = [20, 22, 24, 28, 32];
    const subtitleSizes = [14, 16, 18, 20, 24];

    let textStyle = { ...ss.text, fontSize: titleSizes[size] };
    let subtitleStyle = { ...ss.subtitle, fontSize: subtitleSizes[size] };

    if (badge !== null) {
        badge.style = { ...badge?.style, marginLeft: 5 };
    }

    return (
        <View {...appendedProps}>
            <View style={ss.title}>
                <Text style={textStyle}>{text}</Text>
                {badge && <Badge sm {...badge} />}
            </View>
            {subtitle && <Text style={subtitleStyle}>{subtitle}</Text>}
        </View>
    );
};

Heading.propTypes = {
    size: PropTypes.oneOf([0, 1, 2, 3, 4]),
    text: PropTypes.string,
    badge: PropTypes.object,
    subtitle: PropTypes.string,
};

const ss = StyleSheet.create({
    title: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    text: {
        color: CT.BG_GRAY_900,
        fontWeight: "700",
    },
    subtitle: {
        color: CT.BG_GRAY_500,
    },
});

export default Heading;
