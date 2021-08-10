import React from "react";
import CT from "../const.js";
import Badge from "./badge";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Heading = (props) => {
    const { size = 0, text, kicker, badge = null, subtitle } = props;
    const { textStyle: customTextStyle, kickerStyle: customKickerStyle, subtitleStyle: customSubtitleStyle } = props;
    const appendedProps = _omit(props, ["size", "text", "subtitle"]);
    const titleSizes = [20, 22, 24, 28, 32];
    const subtitleSizes = [14, 16, 18, 20, 24];

    let textStyle = { ...ss.text, fontSize: titleSizes[size], ...customTextStyle };
    let kickerStyle = { ...ss.subtitle, fontSize: subtitleSizes[size], ...customKickerStyle };
    let subtitleStyle = { ...ss.subtitle, fontSize: subtitleSizes[size], ...customSubtitleStyle };

    if (badge !== null) {
        badge.style = { ...badge?.style, marginLeft: 5 };
    }

    return (
        <View {...appendedProps}>
            {kicker && <Text style={kickerStyle}>{kicker}</Text>}
            <View style={ss.title}>
                <Text style={textStyle}>{text}</Text>
                {badge && <Badge xs {...badge} />}
            </View>
            {subtitle && <Text style={subtitleStyle}>{subtitle}</Text>}
        </View>
    );
};

Heading.propTypes = {
    size: PropTypes.oneOf([0, 1, 2, 3, 4]),
    text: PropTypes.string,
    badge: PropTypes.object,
    kicker: PropTypes.string,
    subtitle: PropTypes.string,
    textStyle: PropTypes.object,
    kickerStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
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
        color: CT.BG_GRAY_400,
        fontWeight: "500",
    },
});

export default Heading;
