import React from "react";
import CT from "../const.js";
import Icon from "./icon";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const ButtonIcon = (props) => {
    let {
        style = {},
        color = CT.BG_WHITE,
        icon,
        dot = false,
        glow = false,
        small = false,
        disabled = false,
        inverted = false,
        iconProps = {},
    } = props;

    let iconSize = small ? 20 : 22;
    let innerStyle = { ...styles.inner };
    let buttonStyle = { ...styles.base, ...style };
    let appendedProps = _omit(props, ["style", "color", "icon", "iconProps", "touchableStyle"]);

    if (inverted) color = CT.BG_GRAY_600;
    if (disabled) buttonStyle = { ...buttonStyle, opacity: 0.5 };
    if (glow) {
        color = CT.BG_PURPLE_200;
        iconSize = 14;
        buttonStyle = {
            ...buttonStyle,
            borderRadius: 40,
            backgroundColor: CT.BG_PURPLE_800,
            ...style,
        };
        innerStyle = {
            padding: 5,
            borderRadius: 20,
            backgroundColor: CT.BG_PURPLE_500,
            ...CT.SHADOW_SM,
        };

        // Inverted glow has different colour
        if (inverted) {
            color = CT.BG_GRAY_400;
            buttonStyle = { ...buttonStyle, backgroundColor: CT.BG_GRAY_50 };
            innerStyle = { ...innerStyle, backgroundColor: CT.BG_GRAY_100 };
        }
    }

    return (
        <TouchableOpacity style={buttonStyle} {...appendedProps}>
            <View style={innerStyle}>
                {glow && dot && <View style={styles.dot} />}
                <Icon icon={[glow ? "fas" : "far", icon]} color={color} size={iconSize} {...iconProps} />
            </View>
        </TouchableOpacity>
    );
};

ButtonIcon.propTypes = {
    style: PropTypes.object,
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    dot: PropTypes.bool,
    glow: PropTypes.bool,
    small: PropTypes.bool,
    disabled: PropTypes.bool,
    inverted: PropTypes.bool,
    iconProps: PropTypes.object,
};

const styles = StyleSheet.create({
    base: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inner: {
        padding: 5,
        position: "relative",
    },
    dot: {
        right: 0,
        width: 7,
        height: 7,
        position: "absolute",
        borderRadius: 7,
        backgroundColor: CT.BG_YELLOW_500,
    },
});

export default ButtonIcon;
