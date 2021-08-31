import React, { useState, useContext } from "react";
import CT from "../const.js";
import Icon from "./icon";
import Text from "./text";
import Context from "./context";
import ModalPicker from "./modal-picker";
import PropTypes from "prop-types";

import { countries } from "countries-list";
import { View, Image, Pressable, TextInput, StyleSheet } from "react-native";

import _find from "lodash/find";
import _uniqBy from "lodash/uniqBy";
import _sortBy from "lodash/sortBy";
import _renderIf from "../functions/renderIf";
import _lowerCase from "lodash/lowerCase";

const Input = ({
    name,
    icon,
    iconProps = {},
    type = null,
    style = {},
    onChange,
    onFocus,
    onBlur,
    inputStyle = {},
    nameCC,
    callingCode = CT.DEFAULT_CALLING_CODE,
    ...restProps
}) => {
    const [focused, setFocused] = useState(false);
    const [ccPicker, setCCPicker] = useState(false);
    const ctx = useContext(Context.Fields);
    const inputRef = ctx?.ref;

    // Generate calling code options
    const callingCodes = Object.keys(countries).map((key) => {
        if (countries.hasOwnProperty(key)) {
            const { phone, name } = countries[key];
            return { value: parseInt(phone), label: `${name} (+${phone})`, abbrv: key };
        }
    });
    const countryAbbrv = _lowerCase(_find(callingCodes, { value: callingCode })?.abbrv);
    const countryFlag = { uri: `https://countryflags.io/${countryAbbrv}/flat/64.png` };

    const _onPressFocusInput = () => {
        if (inputRef?.current) {
            inputRef?.current.focus();
            _onFocus();
        }
    };
    const _onValueChange = (value) => {
        if (typeof onChange === "function") {
            onChange(value, name);
        }
    };
    const _onCallingCodeChange = (value) => {
        if (typeof onChange === "function") {
            onChange(value, nameCC);
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
        text: {},
        tel: { keyboardType: "phone-pad", textContentType: "telephoneNumber" },
        url: { keyboardType: "url", textContentType: "URL" },
        name: { autoCapitalize: "words", textContentType: type },
        email: { keyboardType: "email-address", autoCapitalize: "none", textContentType: "emailAddress" },
        number: { keyboardType: "number-pad" },
        password: { secureTextEntry: true, textContentType: "password", multiline: false },
        textarea: { multiline: true },
    };
    typeProps.phone = typeProps.tel;
    typeProps.username = typeProps.name;

    return (
        <Pressable style={inputBaseStyle} onPress={_onPressFocusInput}>
            {_renderIf(
                ["tel", "phone"].indexOf(type) > -1, // Calling Code Picker
                <Pressable style={styles.callingCodes} onPress={setCCPicker.bind(null, true)}>
                    <View style={styles.countryFlagContainer}>
                        <Image source={countryFlag} style={styles.countryFlag} />
                    </View>
                    <Text style={[styles.input, styles.callingCode]}>+{callingCode}</Text>
                    <Icon icon="caret-down" style={styles.callingCodesCaret} />
                    <ModalPicker
                        selectedValue={callingCode}
                        open={ccPicker}
                        label="Calling Codes"
                        options={_uniqBy(_sortBy(callingCodes, "label"), "label")}
                        onClose={setCCPicker.bind(null, false)}
                        onValueChange={_onCallingCodeChange}
                    />
                </Pressable>
            )}
            <TextInput
                ref={ctx?.ref}
                style={{ ...styles.input, ...inputStyle }}
                onBlur={_onBlur}
                onFocus={_onFocus}
                onChangeText={_onValueChange}
                allowFontScaling={false}
                placeholderTextColor={CT.BG_GRAY_300}
                {...typeProps[type]}
                {...restProps}
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
    callingCode: PropTypes.number,
    nameCC: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    onChange: PropTypes.func,
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
        height: 18,
        fontSize: 14,
        borderRadius: radius,
        backgroundColor: CT.BG_WHITE,
    },
    inputBase: {
        padding: 15,
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
    inputContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },

    countryFlag: {
        top: CT.IS_IOS ? 0 : 0,
        width: 22,
        height: 14,
        backgroundColor: CT.BG_GRAY_50,
    },
    countryFlagContainer: {
        width: 21,
        height: 15,
        marginRight: 5,
        borderRadius: 5,
        ...CT.SHADOW_sm,
    },
    callingCode: {
        top: CT.IS_IOS ? 0 : -1,
        flex: 0,
        color: CT.BG_GRAY_500,
    },
    callingCodes: {
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    callingCodesCaret: {
        top: CT.IS_IOS ? -1 : 0,
        color: CT.BG_GRAY_200,
        marginLeft: CT.IS_IOS ? 1 : 2,
    },
});

export default Input;
