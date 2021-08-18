import React, { useState } from "react";
import CT from "../../const";
import Icon from "../icon";
import PropTypes from "prop-types";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";

import _omit from "lodash/omit";

export default function Pet(props) {
    const [pressed, setPressed] = useState(false);
    const { name, size = 60, padding = 3, theme = "default", active, checked } = props;

    const width = size + padding * 2;
    const height = width;
    const radius = size * 0.35;
    const isLight = theme === "light";
    const pressable = {
        onPressIn: setPressed.bind(null, true),
        onPressOut: setPressed.bind(null, false),
    };

    let nameStyle = {};
    let baseStyle = { padding, width, height, borderRadius: radius };
    let imageStyle = { width: size, height: size, borderRadius: radius - padding };
    let imageBaseStyle = { width: size, height: size, borderRadius: radius - padding };
    let overlayStyle = { backgroundColor: isLight ? CT.BG_WHITE : CT.BG_PURPLE_900 };
    let iconBackdropStyle = {
        width: size * 0.34,
        height: size * 0.34,
        borderRadius: size * 0.34,
        backgroundColor: isLight ? CT.CTA_POSITIVE : CT.BG_PURPLE_500,
    };

    // Alter the styles based on several conditions
    if (pressed) baseStyle = { ...baseStyle, transform: [{ scale: 0.96 }] };
    if (active) {
        baseStyle = { ...baseStyle, backgroundColor: CT.BG_YELLOW_500 };
        nameStyle = { ...nameStyle, color: CT.BG_YELLOW_600 };
    } else if (isLight) {
        baseStyle = { ...baseStyle, backgroundColor: CT.BG_GRAY_100 };
        nameStyle = { ...nameStyle, color: checked ? CT.BG_GRAY_800 : CT.BG_GRAY_400 };
    }

    return (
        <Pressable {..._omit(props, ["onPressIn", "onPressOut"])} {...pressable}>
            <View style={[styles.base, baseStyle]}>
                <View style={[styles.imageBase, imageBaseStyle]}>
                    <Image style={[styles.image, imageStyle]} source={require("../../../assets/pet-sample.png")} />
                    {checked && (
                        <React.Fragment>
                            <View style={[imageBaseStyle, styles.overlay, overlayStyle]} />
                            <View style={[styles.iconBackdrop, iconBackdropStyle]} />
                            <Icon icon="fas check-circle" size={size * 0.35} color={CT.BG_WHITE} style={styles.icon} />
                        </React.Fragment>
                    )}
                </View>
            </View>
            {name && <Text style={[styles.name, nameStyle]}>{name}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: CT.BG_PURPLE_600,
    },
    imageBase: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CT.BG_PURPLE_800,
    },
    name: {
        color: CT.BG_PURPLE_400,
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        paddingTop: 5,
    },
    icon: {
        position: "absolute",
        ...CT.SHADOW_MD,
    },
    iconBackdrop: {
        position: "absolute",
    },
    overlay: {
        opacity: 0.4,
        position: "absolute",
    },
});

Pet.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    theme: PropTypes.oneOf(["default", "light"]),
    active: PropTypes.bool,
    checked: PropTypes.bool,
    padding: PropTypes.number,
    onPress: PropTypes.func,
};
