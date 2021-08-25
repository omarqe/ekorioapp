import React from "react";
import CT from "../const";
import Modal from "react-native-modal";
import Heading from "./heading";
import Button from "./button";
import ButtonIcon from "./button-icon";
import PropTypes from "prop-types";

import { Picker } from "@react-native-picker/picker";
import { View, SafeAreaView, StyleSheet } from "react-native";

export default function ModalPicker({ open = false, label, options = [], onClose, ...restProps }) {
    const backdrop = {
        backdropColor: CT.BG_PURPLE_900,
        backdropOpacity: 0.9,
        onBackdropPress: onClose,
    };

    return (
        <Modal style={styles.modal} isVisible={open} useNativeDriverForBackdrop {...backdrop}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Heading size={1} text={label ?? "Please select"} />
                    <ButtonIcon
                        onPress={onClose}
                        icon="times"
                        style={styles.closeBtn}
                        innerStyle={styles.closeBtnInner}
                        iconProps={{ size: 16, color: CT.BG_GRAY_500 }}
                        inverted
                    />
                </View>
                <View style={styles.picker}>
                    <Picker {...restProps}>
                        {options.map(({ value, label }, i) => (
                            <Picker.Item key={value + i} label={label} value={value} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.done}>
                    <Button text="Done" color="purple" onPress={onClose} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const radius = 25;
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    header: {
        padding: radius,
        paddingBottom: 0,
        position: "relative",
    },
    picker: {
        paddingHorizontal: radius - 10,
    },
    done: {
        paddingHorizontal: radius,
    },
    safeArea: {
        backgroundColor: CT.BG_WHITE,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
    },
    closeBtn: {
        top: 25,
        right: 25,
        width: 55,
        height: 55,
        position: "absolute",
    },
    closeBtnInner: {
        padding: 2,
        width: 25,
        height: 25,
        marginTop: -30,
        marginRight: -30,
        borderRadius: 27,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CT.BG_GRAY_100,
    },
});

ModalPicker.propTypes = {
    open: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onClose: PropTypes.func,
    selectedValue: PropTypes.any,
    onValueChange: PropTypes.func,
};
