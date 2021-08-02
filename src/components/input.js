import React, { useContext } from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import FieldContext from "./field-context";
import { TextInput, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Input = (props) => {
    const { type = null, style = {} } = props;
    const appendedProps = _omit(props, ["type", "style"]);
    const inputStyle = { ...ss.textInput, ...style };
    const ctx = useContext(FieldContext);

    let preparedProps = {};
    switch (type) {
        case "name":
            preparedProps = { autoCapitalize: "words" };
            break;
        case "password":
            preparedProps = { keyboardType: "visible-password", secureTextEntry: true };
            break;
        case "email":
            preparedProps = { keyboardType: "email-address", autoCapitalize: "none" };
            break;
        case "tel":
        case "phone":
            preparedProps = { keyboardType: "phone-pad" };
            break;
        case "number":
            preparedProps = { keyboardType: "number-pad" };
            break;
        case "url":
            preparedProps = { keyboardType: "url" };
            break;
    }

    return <TextInput ref={ctx?.ref} style={inputStyle} {...preparedProps} {...appendedProps} />;
};

Input.propTypes = {
    type: PropTypes.oneOf(["name", "password", "email", "tel", "phone", "number", "url"]),
    style: PropTypes.object,
    placeholder: PropTypes.string,
};

const ss = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        borderRadius: 6,
        fontSize: 16,
        backgroundColor: CT.BG_WHITE,
        ...CT.SHADOW_SM,
    },
});

export default Input;
