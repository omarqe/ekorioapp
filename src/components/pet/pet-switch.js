import React, { useState } from "react";
import CT from "../../const";
import Icon from "../icon";
import PropTypes from "prop-types";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

const PetSwitch = connectActionSheet(({ style, onPress, onPressIn, onPressOut }) => {
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
    const _onPress = (index) => {
        // ... do something here
        if (typeof onPress === "function") {
            onPress(index);
        }
    };

    return (
        <Pressable style={styles.base} onPress={_onPress} onPressIn={_onPressIn} onPressOut={_onPressOut}>
            <Icon icon="fas caret-down" size={18} color={pressed ? CT.BG_PURPLE_600 : CT.BG_PURPLE_500} />
            <View style={[{ ...styles.imageBase, ...style }, { opacity: pressed ? 0.8 : 1 }]}>
                <View style={styles.imagePlaceholder}>
                    <Image style={styles.image} source={require("../../../assets/pet-sample.png")} />
                </View>
            </View>
        </Pressable>
    );
});

const size = 34;
const radius = 12;
const padding = 3;
const styles = StyleSheet.create({
    base: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 5,
        flexDirection: "row",
        borderRadius: radius,
    },
    imageBase: {
        width: size + padding * 2,
        height: size + padding * 2,
        padding: padding,
        marginLeft: 5,
        borderRadius: radius,
        backgroundColor: CT.BG_PURPLE_600,
    },
    imagePlaceholder: {
        width: size,
        height: size,
        borderRadius: radius - padding,
        backgroundColor: CT.BG_PURPLE_700,
    },
    image: {
        width: size,
        height: size,
        borderRadius: radius - padding,
    },
});

PetSwitch.propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};

export default PetSwitch;
