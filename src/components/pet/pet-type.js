import React from "react";
import CT from "../../const";
import Icon from "../icon";
import PropTypes from "prop-types";

import Cat from "../../../assets/pet-types/cat.svg";
import Dog from "../../../assets/pet-types/dog.svg";
import Bird from "../../../assets/pet-types/bird.svg";
import Rabbit from "../../../assets/pet-types/rabbit.svg";
import Turtle from "../../../assets/pet-types/turtle.svg";

import { Text, View, Pressable, StyleSheet } from "react-native";
export default function PetType(props) {
    let { type, style = {}, active, onPress: _onPress, disabled = false } = props;

    const icon = { cat: Cat, dog: Dog, bird: Bird, rabbit: Rabbit, turtle: Turtle };
    const onPress = typeof _onPress === "function" && !disabled ? _onPress.bind(null, type) : null;
    const disabledStyle = onPress === null || disabled ? { opacity: 0.4 } : null;

    const PetIcon = icon[type] ?? null;

    return (
        <Pressable style={disabledStyle} onPress={onPress} disabled={disabled}>
            <View style={[styles.base, active ? styles.baseActive : {}, style]}>
                {icon[type] ? <PetIcon width={48} /> : <Icon icon="fas paw" size={28} color={CT.BG_PURPLE_500} />}
            </View>
            <Text style={[styles.type, active ? styles.typeActive : {}]}>{type}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    type: {
        color: CT.BG_GRAY_400,
        marginTop: 5,
        fontWeight: "600",
        textAlign: "center",
        textTransform: "capitalize",
    },
    typeActive: {
        color: CT.BG_PURPLE_400,
    },
    base: {
        width: 75,
        height: 75,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 20,
    },
    baseActive: {
        borderColor: CT.BG_PURPLE_300,
        backgroundColor: CT.BG_PURPLE_50,
    },
});

PetType.propTypes = {
    type: PropTypes.string,
    style: PropTypes.object,
    active: PropTypes.bool,
};
