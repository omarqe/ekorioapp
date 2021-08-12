import React, { useState } from "react";
import CT from "../const";
import Icon from "./icon";
import PropTypes from "prop-types";
import { Text, View, Pressable, StyleSheet } from "react-native";

import _omit from "lodash/omit";

export default function ListItem(props) {
    const appendedProps = _omit(props, ["style", "onPressIn", "onPressOut"]);
    const { last, icon, text, subtitle, onPressOut, onPressIn } = props;

    const [pressed, setPressed] = useState(false);
    const _onPressIn = () => {
        setPressed(true);
        if (typeof onPressIn === "function") {
            onPressIn();
        }
    };
    const _onPressOut = () => {
        setPressed(false);
        if (typeof onPressOut === "function") {
            onPressOut();
        }
    };

    let baseStyle = styles.base;

    if (last) baseStyle = { ...baseStyle, borderBottomWidth: 1 };
    if (pressed) baseStyle = { ...baseStyle, backgroundColor: CT.BG_GRAY_50 };

    return (
        <Pressable style={baseStyle} onPressIn={_onPressIn} onPressOut={_onPressOut} {...appendedProps}>
            {icon && (
                <View style={styles.iconContainer}>
                    <Icon icon={`fal ${icon}`} size={20} color={CT.BG_GRAY_300} />
                </View>
            )}
            <View style={styles.labelContainer}>
                <Text style={styles.title}>{text}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingTop: 12,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        paddingBottom: 12,

        display: "flex",
        alignItems: "center",
        flexDirection: "row",

        backgroundColor: CT.BG_WHITE,
        borderColor: CT.BG_GRAY_100,
        borderTopWidth: 1,
        // borderBottomWidth: 1,
    },
    iconContainer: {
        width: 25,
        marginRight: 10,
    },
    labelContainer: {},
    title: {
        color: CT.FONT_COLOR,
        fontSize: 16,
        fontWeight: "700",
    },
    subtitle: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 14,
    },
});

ListItem.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    last: PropTypes.bool,
    subtitle: PropTypes.string,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};
