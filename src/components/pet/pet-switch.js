import React, { useState } from "react";
import CT from "../../const";

import Pet from "./";
import Icon from "../icon";
import Modal from "../modal";
import PetList from "./pet-list";
import PropTypes from "prop-types";

import { View, Pressable, StyleSheet } from "react-native";

import _find from "lodash/find";

const PetSwitch = ({ pets = [], checked, onSwitch, onPressIn, onPressOut, supressed = false }) => {
    const [open, setOpen] = useState(false);
    const [pressed, setPressed] = useState(false);

    const _onOpen = () => setOpen(!supressed && true);
    const _onClose = () => setOpen(false);
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
    const _onSwitch = (id, index) => {
        setOpen(false);
        if (typeof onSwitch === "function") {
            onSwitch(id, index);
        }
    };

    const currentPet = _find(pets, { id: checked });

    return (
        <React.Fragment>
            <Pressable style={styles.base} onPress={_onOpen} onPressIn={_onPressIn} onPressOut={_onPressOut}>
                {!supressed && <Icon icon="fas caret-down" size={18} color={pressed ? CT.BG_PURPLE_600 : CT.BG_PURPLE_500} />}
                <Pet size={34} style={styles.petImage} image={currentPet?.image} onPress={_onOpen} />
            </Pressable>

            <Modal title="Choose Pet" open={open} onClose={_onClose}>
                <View style={styles.petListContainer}>
                    <PetList data={pets} onPress={_onSwitch} theme="light" checked={checked} />
                </View>
            </Modal>
        </React.Fragment>
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
    petListContainer: {
        display: "flex",
        flexDirection: "row",
    },
});

PetSwitch.propTypes = {
    style: PropTypes.object,
    pets: PropTypes.arrayOf(PropTypes.object),
    checked: PropTypes.number,
    onSwitch: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};

export default PetSwitch;
