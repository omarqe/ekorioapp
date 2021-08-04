import React from "react";
import CT from "../const.json";
import Icon from "./icon";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const ButtonOrb = (props) => {
    let { style = {}, color = CT.BG_WHITE, icon, iconProps = {}, touchableStyle = {}, inverted = false } = props;
    const buttonStyle = { ...ss.base, ...style };
    const appendedProps = _omit(props, ["style", "color", "icon", "iconProps", "touchableStyle"]);

    if (inverted) {
        color = CT.BG_PURPLE_900;
    }

    return (
        <View style={buttonStyle}>
            <TouchableOpacity style={touchableStyle} {...appendedProps}>
                <Icon icon={`far ${icon}`} color={color} iconStyle={ss.iconStyle} size={22} {...iconProps} />
            </TouchableOpacity>
        </View>
    );
};

ButtonOrb.propTypes = {
    color: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.string.isRequired,
    iconProps: PropTypes.object,
    touchableStyle: PropTypes.object,
    inverted: PropTypes.bool,
};

const ss = StyleSheet.create({
    base: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        fontSize: 22,
    },
});

export default ButtonOrb;
