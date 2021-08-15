import React, { useState } from "react";
import CT from "../../const.js";
import Icon from "../icon";
import PropTypes from "prop-types";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";

import _renderIf from "../../functions/renderIf";

export default function PetOrb({ add, active = false, onPress, onPressIn, onPressOut, checked = false, switcher = false }) {
    const [pressed, setPressed] = useState(false);
    let data = { name: "Cheshire", imageSrc: require("../../../assets/pet-sample.png") };
    let nameStyle = styles.name;
    let baseStyle = styles.base;
    let imageBaseStyle = styles.imageBase;

    if (add) active = false;
    if (active) {
        nameStyle = { ...nameStyle, color: CT.BG_YELLOW_300 };
        imageBaseStyle = { ...imageBaseStyle, backgroundColor: CT.BG_YELLOW_500 };
    }
    if (switcher) {
        nameStyle = { ...nameStyle, color: CT.BG_GRAY_400 };
        imageBaseStyle = { ...imageBaseStyle, backgroundColor: CT.BG_GRAY_100 };
        if (checked) {
            nameStyle = { ...nameStyle, color: CT.FONT_COLOR };
            imageBaseStyle = { ...imageBaseStyle, backgroundColor: CT.BG_GRAY_100 };
        }
    }
    if (pressed) {
        imageBaseStyle = [imageBaseStyle, { transform: [{ scale: 0.96 }] }];
    }

    const _onPressIn = () => {
        setPressed(true);
        if (typeof onPressIn === "function") onPressIn();
    };

    const _onPressOut = () => {
        setPressed(false);
        if (typeof onPressOut === "function") onPressOut();
    };

    return (
        <Pressable onPress={onPress} onPressOut={_onPressOut} onPressIn={_onPressIn}>
            <View style={baseStyle}>
                <View style={imageBaseStyle}>
                    {_renderIf(
                        add === true,
                        <Icon icon="far plus" color={CT.BG_PURPLE_400} size={20} />,
                        <Image style={styles.image} source={data?.imageSrc} />
                    )}
                    {checked && (
                        <View style={styles.overlay}>
                            <View style={styles.checkedIcon} />
                            <Icon icon="check-circle" size={24} color="#fff" style={{ ...CT.SHADOW_MD }} />
                        </View>
                    )}
                </View>
                <Text style={nameStyle}>{add ? "Add Pet" : data?.name}</Text>
            </View>
        </Pressable>
    );
}

PetOrb.propTypes = {
    add: PropTypes.bool,
    data: PropTypes.object,
    active: PropTypes.bool,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    checked: PropTypes.bool,
    switcher: PropTypes.bool,
};

const size = 60;
const padding = 3;
const styles = StyleSheet.create({
    base: {
        width: size + padding * 2,
        marginRight: 10,
    },
    imageBase: {
        display: "flex",
        width: size + padding * 2,
        height: size + padding * 2,
        padding: padding,
        borderRadius: 20,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: CT.BG_PURPLE_800,
    },
    overlay: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,.5)",
        borderRadius: 20 - padding,
    },
    checkedIcon: {
        width: 22,
        height: 22,
        position: "absolute",
        borderRadius: 100,
        backgroundColor: CT.CTA_POSITIVE,
    },
    name: {
        color: CT.BG_PURPLE_400,
        marginTop: 5,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 12,
    },
    image: {
        width: size,
        height: size,
        borderRadius: 20 - padding,
    },
    addButton: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: CT.BG_PURPLE_800,
    },
});
