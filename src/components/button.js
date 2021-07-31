import React from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import _omit from "lodash/omit";

const Button = (props) => {
    const { text, style, touchableStyle } = props;
    const textStyle = ss.text;
    const buttonStyle = { ...ss.buttonStyle, ...style };
    const appendedProps = _omit(props, ["style", "touchableStyle"]);

    return (
        <View style={buttonStyle}>
            <TouchableOpacity style={{ ...ss.touchable, ...touchableStyle }} {...appendedProps}>
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const radius = 8;
const ss = StyleSheet.create({
    buttonStyle: {
        borderRadius: radius,
        backgroundColor: CT.BG_YELLOW_700,
    },
    touchable: {
        padding: 15,
        borderRadius: radius,
        backgroundColor: CT.BG_YELLOW_500,
    },
    text: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        textAlign: "center",
    },
});

Button.propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func,
};

export default Button;
