import React, { useState } from "react";
import CT from "../../const";
import Pet from "../pet";
import Icon from "../icon";
import PropTypes from "prop-types";
import { Pressable, StyleSheet } from "react-native";

const PetSwitch = ({ onPress, onPressIn, onPressOut }) => {
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
            <Pet size={34} style={styles.petImage} image={require("../../../assets/pets/cat-04.png")} defaultSource />
        </Pressable>
    );
};

const radius = 12;
const styles = StyleSheet.create({
    petImage: {
        marginLeft: 5,
    },
    base: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 5,
        borderRadius: radius,
        flexDirection: "row",
    },
});

PetSwitch.propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};

export default PetSwitch;
