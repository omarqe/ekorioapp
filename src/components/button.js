import React, { useState } from "react";
import CT from "../const.js";
import Icon from "./icon";
import Text from "./text";
import PropTypes from "prop-types";
import { View, Pressable, StyleSheet, ActivityIndicator } from "react-native";

import _get from "lodash/get";
import _renderIf from "../functions/renderIf";

const Button = (props) => {
    let variant = {};
    const [pressed, setPressed] = useState(0);
    const { small = false, disabled = false, loading = false } = props;
    const { text, style, textStyle, color = "default", onPress, icon, iconRight } = props;

    const colors = {
        spinner: { default: CT.BG_GRAY_400, yellow: CT.BG_WHITE, purple: CT.BG_PURPLE_100 },
        label: { default: CT.FONT_COLOR, yellow: CT.BG_YELLOW_800, purple: CT.BG_PURPLE_50 },
        icon: { default: CT.BG_GRAY_200, yellow: CT.BG_YELLOW_700, purple: CT.BG_PURPLE_400 },
        base: [
            { default: CT.BG_WHITE, yellow: CT.BG_YELLOW_500, purple: CT.BG_PURPLE_500 }, // pressed=0
            { default: CT.BG_GRAY_50, yellow: CT.BG_YELLOW_600, purple: CT.BG_PURPLE_600 }, // pressed=1
        ],
    };

    // Handle variants
    variant.label = { color: _get(colors, `label[${color}]`, colors.label.default) };
    variant.small = {};
    variant.base = { backgroundColor: _get(colors, `base[${pressed}][${color}]`, colors.base[pressed].default) };
    if (color !== "default") variant.base.borderColor = variant.base.backgroundColor;
    if (small) {
        variant.small.base = { padding: CT.PIXELRATIO < 3 ? 8 : 10, borderRadius: 8 };
        variant.small.label = { fontSize: 12, textTransform: "none" };
    }

    // Handle style
    const iconColor = _get(colors, `icon[${color}]`, colors.icon.default);
    const baseStyle = [styles.base, variant?.base, variant?.small?.base, style];
    const labelStyle = [styles.label, variant?.label, variant?.small?.label];
    const ButtonIcon = ({ position = "left" }) => {
        const size = small ? 12 : 14;
        const iconProps = { icon, size, color: iconColor, style: position === "left" ? styles.iconLeft : styles.iconRight };

        if (icon && !iconRight && position === "left") return <Icon {...iconProps} />;
        else if (icon && iconRight && position === "right") return <Icon {...iconProps} />;
        else return null;
    };

    return (
        <Pressable
            disabled={disabled || loading}
            onPress={!disabled ? onPress : null}
            onPressIn={!disabled ? setPressed.bind(null, 1) : null}
            onPressOut={!disabled ? setPressed.bind(null, 0) : null}
        >
            <View style={[baseStyle, { opacity: disabled ? 0.4 : 1 }]}>
                {_renderIf(
                    loading === true,
                    <ActivityIndicator color={iconColor} />,
                    <>
                        <ButtonIcon position="left" />
                        <Text style={[labelStyle, textStyle]}>{text}</Text>
                        <ButtonIcon position="right" />
                    </>
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        ...CT.SHADOW_SM,
        padding: 14,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: CT.BG_WHITE,
        borderColor: CT.BG_GRAY_100,
        borderWidth: 1,
        borderRadius: 10,
    },
    label: {
        color: CT.FONT_COLOR,
        fontSize: 14,
        fontWeight: "700",
        textTransform: "uppercase",
        textAlign: "center",
    },
    iconLeft: {
        top: -1,
        marginRight: 5,
    },
    iconRight: {
        top: -1,
        marginLeft: 5,
    },
});

Button.propTypes = {
    onPress: PropTypes.func,
    iconRight: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string,
    small: PropTypes.bool,
    color: PropTypes.oneOf(["default", "yellow", "purple"]),
    style: PropTypes.object,
    textStyle: PropTypes.object,
};

export default Button;
