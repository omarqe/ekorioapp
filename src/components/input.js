import React, { useState, useContext } from "react";
import CT from "../const.js";
import Icon from "./icon";
import Context from "./context";
import PropTypes from "prop-types";
import { View, Pressable, TextInput, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Input = (props) => {
    const [focused, setFocused] = useState(false);
    const { icon, iconProps = {}, type = null, style = {}, onFocus, onBlur, inputStyle = {} } = props;
    const appendedProps = _omit(props, ["type", "style", "onFocus", "inputStyle"]);
    const ctx = useContext(Context.Fields);
    const inputRef = ctx?.ref;

    const _onPressFocusInput = () => {
        if (inputRef?.current) {
            inputRef?.current.focos();
            _onFocus();
        }
    };

    // Hook onFocus() and onBlur() callbacks
    const _onFocus = () => {
        setFocused(true);
        if (typeof onFocus === "function") {
            onFocus();
        }
    };
    const _onBlur = () => {
        setFocused(false);
        if (typeof onBlur === "function") {
            onBlur();
        }
    };

    let inputBaseStyle = { ...styles.inputBase, ...style };
    if (focused) {
        inputBaseStyle = { ...inputBaseStyle, borderColor: CT.BORDER_FOCUS };
    }

    let typeProps = {
        tel: { keyboardType: "phone-pad", textContentType: "telephoneNumber" },
        url: { keyboardType: "url", textContentType: "URL" },
        name: { autoCapitalize: "words", textContentType: type },
        email: { keyboardType: "email-address", autoCapitalize: "none", textContentType: "emailAddress" },
        number: { keyboardType: "number-pad" },
        password: { keyboardType: "visible-password", secureTextEntry: true, textContentType: "password" },
    };
    typeProps.phone = typeProps.tel;
    typeProps.username = typeProps.name;

    return (
        <Pressable style={inputBaseStyle} onPress={_onPressFocusInput}>
            <TextInput
                ref={ctx?.ref}
                style={{ ...styles.input, ...inputStyle }}
                onBlur={_onBlur}
                onFocus={_onFocus}
                placeholderTextColor={CT.BG_GRAY_300}
                {...typeProps[type]}
                {...appendedProps}
            />
            {icon && (
                <View style={styles.iconContainer}>
                    <Icon icon={icon} color={CT.BG_GRAY_600} {...iconProps} />
                </View>
            )}
        </Pressable>
    );
};

Input.propTypes = {
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.oneOf(CT.INPUT_TYPES),
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    placeholder: PropTypes.string,
};

const radius = 6;
const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: 15,
        borderRadius: radius,
        backgroundColor: CT.BG_WHITE,
    },
    inputBase: {
        fontSize: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        borderRadius: radius,
        flexDirection: "row",
        backgroundColor: CT.BG_WHITE,
        ...CT.SHADOW_SM,
    },
    iconContainer: {
        paddingRight: 12,
    },
});

export default Input;
