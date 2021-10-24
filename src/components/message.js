import React from "react";
import CT from "../const";
import Icon from "./icon";
import Text from "./text";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export default function Message({ text, icon, title, color = "gray", style, textStyle, titleStyle, contentStyle }) {
    const colors = CT.COLORED_STYLES;
    const textColor = colors[color]?.text;
    const baseColor = colors[color]?.base;

    return (
        <View style={[styles.base, baseColor, style]}>
            {icon && (
                <View style={[styles.content, styles.icon]}>
                    <Icon icon={icon} size={14} color={textColor?.color} style={{ opacity: 0.8 }} />
                </View>
            )}
            <View style={(styles.content, contentStyle)}>
                <Text style={[styles.title, textColor, titleStyle]}>{title}</Text>
                <Text style={[styles.text, textColor, textStyle]}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
    },
    text: {
        fontSize: 12,
    },
    title: {
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 2,
    },
    icon: {
        width: 23,
        paddingTop: 1,
        justifyContent: "flex-start",
    },
    content: {
        justifyContent: "center",
    },
});

Message.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(CT.COLORED_STYLES)),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
