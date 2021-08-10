import React from "react";
import CT from "../const.js";
import Icon from "./icon";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import _omit from "lodash/omit";

const Button = (props) => {
    const { label, small = false, color = "yellow", style, touchableStyle } = props;
    const appendedProps = _omit(props, [
        "label",
        "small",
        "color",
        "style",
        "icon",
        "iconProps",
        "iconRight",
        "touchableStyle",
    ]);

    let labelStyle = ss.label;
    let buttonStyle = { ...ss.buttonStyle, ...style };
    let buttonTouchStyle = { ...ss.touchable };

    if (small) {
        labelStyle = { ...labelStyle, fontSize: 14, textTransform: "none" };
        buttonTouchStyle = { ...buttonTouchStyle, padding: CT.PIXELRATIO < 3 ? 8 : 10 };
    }

    switch (color) {
        case "white": {
            labelStyle = { ...labelStyle, color: CT.BG_GRAY_700 };
            buttonStyle = { ...buttonStyle, borderColor: CT.BG_GRAY_100, backgroundColor: CT.BG_GRAY_50 };
            buttonTouchStyle = { ...buttonTouchStyle, backgroundColor: CT.BG_WHITE };
        }
    }

    // Give margin to icon
    let iconColor = CT.BG_GRAY_300;
    const { icon, iconProps = {}, iconRight = false } = props;
    iconProps.style = { ...iconProps?.style, marginTop: -2, marginLeft: iconRight ? 5 : 0, marginRight: !iconRight ? 5 : 0 };

    return (
        <View style={buttonStyle}>
            <TouchableOpacity
                style={{ ...buttonTouchStyle, ...touchableStyle }}
                activeOpacity={CT.ACTIVE_OPACITY}
                {...appendedProps}
            >
                {icon && !iconRight && <Icon icon={icon} color={iconColor} {...iconProps} />}
                <Text style={labelStyle}>{label}</Text>
                {icon && iconRight && <Icon icon={icon} color={iconColor} {...iconProps} />}
            </TouchableOpacity>
        </View>
    );
};

const radius = 8;
const ss = StyleSheet.create({
    buttonStyle: {
        ...CT.SHADOW_SM,
        borderWidth: 1,
        borderColor: CT.BG_YELLOW_500,
        borderRadius: radius,
        backgroundColor: CT.BG_YELLOW_600,
    },
    touchable: {
        padding: 15,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: radius,
        backgroundColor: CT.BG_YELLOW_500,
    },
    label: {
        color: CT.BG_YELLOW_900,
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        textAlign: "center",
    },
});

Button.propTypes = {
    iconRight: PropTypes.bool,
    iconProps: PropTypes.object,
    icon: PropTypes.string,
    text: PropTypes.string,
    small: PropTypes.bool,
    style: PropTypes.object,
    color: PropTypes.oneOf(["yellow", "white"]),
    onPress: PropTypes.func,
};

export default Button;
