import React from "react";
import CT from "../const.js";
import Badge from "./badge";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Heading = (props) => {
    const { size = 0, text, style, kicker, badge = null, subtitle, gapless = false, disabled = false } = props;
    const { textStyle: customTextStyle, kickerStyle: customKickerStyle, subtitleStyle: customSubtitleStyle } = props;
    const appendedProps = _omit(props, ["size", "text", "style", "subtitle"]);
    const titleSizes = [20, 22, 24, 26, 28];
    const subtitleSizes = [16, 16, 18, 18, 20];

    let baseStyle = { ...styles.base, ...style };
    let textStyle = { ...styles.text, fontSize: titleSizes[size], ...customTextStyle };
    let kickerStyle = { ...styles.subtitle, fontSize: subtitleSizes[size], ...customKickerStyle };
    let subtitleStyle = { ...styles.subtitle, fontSize: subtitleSizes[size], ...customSubtitleStyle };

    if (badge !== null) badge.style = { ...badge?.style, marginLeft: 5 };
    if (gapless) baseStyle = { ...baseStyle, marginBottom: 0 };

    return (
        <View style={baseStyle} {...appendedProps}>
            {kicker && <Text style={kickerStyle}>{kicker}</Text>}
            <View style={styles.title}>
                <Text style={[textStyle, { color: disabled ? CT.BG_GRAY_300 : textStyle?.color }]}>{text}</Text>
                {badge && <Badge xs={size < 2} {...badge} />}
            </View>
            {subtitle && <Text style={subtitleStyle}>{subtitle}</Text>}
        </View>
    );
};

Heading.propTypes = {
    disabled: PropTypes.bool,
    gapless: PropTypes.bool,
    style: PropTypes.object,
    size: PropTypes.oneOf([0, 1, 2, 3, 4]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    badge: PropTypes.object,
    kicker: PropTypes.string,
    subtitle: PropTypes.string,
    textStyle: PropTypes.object,
    kickerStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    base: {
        marginBottom: 10,
    },
    title: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    text: {
        color: CT.FONT_COLOR,
        fontWeight: "700",
    },
    subtitle: {
        color: CT.FONT_COLOR_LIGHT,
        marginBottom: 2,
    },
});

export default Heading;
