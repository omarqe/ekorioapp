import React, { useState } from "react";
import CT from "../../const.js";
import Icon from "../icon";
import PropTypes from "prop-types";
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";

import _renderIf from "../../functions/renderIf";

const Pet = ({ add, active = false, onPress, onPressIn, onPressOut }) => {
    const [pressed, setPressed] = useState(false);
    let data = { name: "Dabbeu", imageSrc: require("../../../assets/pet-sample.png") };
    let nameStyle = ss.name;
    let baseStyle = ss.base;
    let imageBaseStyle = ss.imageBase;

    if (add) active = false;
    if (active) {
        nameStyle = { ...nameStyle, color: CT.BG_YELLOW_300 };
        imageBaseStyle = { ...imageBaseStyle, backgroundColor: CT.BG_YELLOW_500 };
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
        <TouchableWithoutFeedback onPress={onPress} onPressOut={_onPressOut} onPressIn={_onPressIn}>
            <View style={baseStyle}>
                <View style={imageBaseStyle}>
                    {_renderIf(
                        add === true,
                        <Icon icon="far plus" color={CT.BG_PURPLE_400} size={20} />,
                        <Image style={ss.image} source={data?.imageSrc} />
                    )}
                </View>
                <Text style={nameStyle}>{add ? "Add Pet" : data?.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

Pet.propTypes = {
    add: PropTypes.bool,
    data: PropTypes.object,
    active: PropTypes.bool,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};

const size = 60;
const padding = 3;
const ss = StyleSheet.create({
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: CT.BG_PURPLE_800,
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
        borderRadius: 17,
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

export default Pet;
