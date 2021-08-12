import React, { useState, useContext } from "react";
import CT from "../const.js";
import PropTypes from "prop-types";
import Context from "./context";
import { View, TextInput, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Input = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const { type = null, style = {}, onFocus, onBlur, inputStyle = {} } = props;
    const appendedProps = _omit(props, ["type", "style", "onFocus", "inputStyle"]);
    const ctx = useContext(Context.Fields);

    // Hook onFocus() and onBlur() callbacks
    const _onFocus = () => {
        setIsFocused(true);
        if (typeof onFocus === "function") {
            onFocus();
        }
    };
    const _onBlur = () => {
        setIsFocused(false);
        if (typeof onBlur === "function") {
            onBlur();
        }
    };

    let inputBaseStyle = { ...styles.inputBase, ...style };
    if (isFocused) {
        inputBaseStyle = { ...inputBaseStyle, borderColor: CT.BORDER_FOCUS };
    }

    let typeProps = {};
    switch (type) {
        case "name":
        case "username":
            typeProps = { autoCapitalize: "words", textContentType: type };
            break;
        case "password":
            typeProps = { keyboardType: "visible-password", secureTextEntry: true, textContentType: "password" };
            break;
        case "email":
            typeProps = { keyboardType: "email-address", autoCapitalize: "none", textContentType: "emailAddress" };
            break;
        case "tel":
        case "phone":
            typeProps = { keyboardType: "phone-pad", textContentType: "telephoneNumber" };
            break;
        case "number":
            typeProps = { keyboardType: "number-pad" };
            break;
        case "url":
            typeProps = { keyboardType: "url", textContentType: "URL" };
            break;
    }

    return (
        <View style={inputBaseStyle}>
            <TextInput
                ref={ctx?.ref}
                style={inputStyle}
                onBlur={_onBlur}
                onFocus={_onFocus}
                {...typeProps}
                {...appendedProps}
            />
        </View>
    );
};

Input.propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.oneOf(CT.INPUT_TYPES),
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
    inputBase: {
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        borderRadius: 6,
        backgroundColor: CT.BG_WHITE,
        ...CT.SHADOW_SM,
    },
});

export default Input;
