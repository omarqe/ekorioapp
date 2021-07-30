import React from "react";
import CT from "../const.json";
import _omit from "lodash/omit";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button(props) {
    const appendProps = _omit(props, ["style"]);
    const { text, style } = props;

    let textStyle = ss.text;
    let buttonStyle = { ...ss.base, ...style };

    return (
        <TouchableOpacity style={buttonStyle} {...appendProps}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

const ss = StyleSheet.create({
    base: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: CT.BG_YELLOW_500,
    },
    text: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        textAlign: "center",
    },
});
