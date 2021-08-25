import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

export default function KeyboardAvoiding({
    style,
    offset = 0,
    children,
    behavior = CT.IS_IOS ? "padding" : null,
    keyboardVerticalOffset = 0,
    ...restProps
}) {
    return (
        <KeyboardAvoidingView style={[styles.base, style]} behavior={behavior} keyboardVerticalOffset={offset} {...restProps}>
            {children}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    base: { flex: 1 },
});

KeyboardAvoiding.propTypes = {
    style: PropTypes.object,
    offset: PropTypes.number,
    behavior: PropTypes.oneOf(["padding", "position", "height", null]),
};
