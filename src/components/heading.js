import React from "react";
import CT from "../const.js";
import Text from "./text";
import Badge from "./badge";
import Shimmer from "./shimmer";
import PropTypes from "prop-types";

import { View, StyleSheet } from "react-native";

import _renderIf from "../functions/renderIf";

const Heading = ({
    size = 0,
    text,
    style,
    kicker,
    badge = null,
    subtitle,
    loading = false,
    gapless = false,
    disabled = false,
    centered = false,
    textStyle: customTextStyle,
    kickerStyle: customKickerStyle,
    subtitleStyle: customSubtitleStyle,
    ...restProps
}) => {
    const titleSizes = [16, 18, 20, 22, 24];
    const subtitleSizes = [13, 14, 15, 16, 17];

    let baseStyle = { ...styles.base, ...style };
    let textStyle = { ...styles.text, fontSize: titleSizes[size], ...customTextStyle };
    let kickerStyle = { ...styles.subtitle, fontSize: subtitleSizes[size], ...customKickerStyle };
    let subtitleStyle = { ...styles.subtitle, fontSize: subtitleSizes[size], ...customSubtitleStyle };

    if (badge !== null) badge.style = { ...badge?.style, marginLeft: 5 };
    if (gapless) baseStyle = { ...baseStyle, marginBottom: 0 };
    if (centered) {
        textStyle = { ...textStyle, textAlign: "center" };
        kickerStyle = { ...kickerStyle, textAlign: "center" };
        subtitleStyle = { ...subtitleStyle, textAlign: "center" };
    }

    return (
        <View style={baseStyle} {...restProps}>
            {kicker && _renderIf(loading, <Shimmer width={80} height={8} />, <Text style={kickerStyle}>{kicker}</Text>)}
            <View style={styles.title}>
                {_renderIf(
                    loading,
                    <Shimmer width={180} height={12} style={{ marginTop: 5, marginBottom: 6 }} />,
                    <Text style={[textStyle, { color: disabled ? CT.BG_GRAY_300 : textStyle?.color }]}>{text}</Text>
                )}
                {badge && <Badge xs={size < 2} {...badge} />}
            </View>
            {subtitle && _renderIf(loading, <Shimmer width={120} height={8} />, <Text style={subtitleStyle}>{subtitle}</Text>)}
        </View>
    );
};

Heading.propTypes = {
    disabled: PropTypes.bool,
    gapless: PropTypes.bool,
    loading: PropTypes.bool,
    style: PropTypes.object,
    size: PropTypes.oneOf([0, 1, 2, 3, 4]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    badge: PropTypes.object,
    kicker: PropTypes.string,
    subtitle: PropTypes.string,
    centered: PropTypes.bool,
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
