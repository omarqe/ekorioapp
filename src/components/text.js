import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { Text as RNText, StyleSheet } from "react-native";

export default function Text({ style, ...restProps }) {
    let textStyle = {};
    if (CT.IS_ANDROID) {
        const s = StyleSheet.flatten(style);
        const w = parseInt(s?.fontWeight ?? 400);
        const fonts = { 400: "Inter_400Regular", 500: "Inter_500Medium", 600: "Inter_600SemiBold", 700: "Inter_700Bold" };

        textStyle = { fontFamily: fonts[w] !== undefined ? fonts[w] : fonts[400] };
    }

    return <RNText style={[styles.text, textStyle, style]} allowFontScaling={false} {...restProps} />;
}

const styles = {
    text: { color: CT.FONT_COLOR, fontSize: 14 },
};

Text.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
