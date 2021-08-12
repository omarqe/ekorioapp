import React, { useRef, useState } from "react";
import CT from "../const";
import Icon from "./icon";
import Picker from "react-native-picker-select";
import PropTypes from "prop-types";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _times from "lodash/times";
import _renderIf from "../functions/renderIf";
export default function FloatingField(props) {
    const [focused, setFocused] = useState(false);
    const { gapless = false, strengthGuide = false } = props;
    const { type = null, label, guide, style = {}, onBlur, onFocus } = props;

    const phColor = CT.BG_GRAY_100;
    const isSelect = type === "select";
    const inputRef = useRef(null);
    const inputProps = _omit(props, ["type", "label", "style", "onBlur", "onFocus", "gapless", "strengthGuide"]);

    // Negates guide if strengthGuide is true
    if (strengthGuide && guide) guide = false;

    // Handle UX feedbacks
    const _onPressFocusInput = () => {
        if (isSelect) {
            inputRef?.current?.togglePicker(true);
            return;
        }

        inputRef?.current?.focus();
    };
    const _onFocus = () => {
        setFocused(true);
        if (typeof onFocus === "function") onFocus();
    };
    const _onBlur = () => {
        setFocused(false);
        if (typeof onBlur === "function") onBlur();
    };

    // Handle styles
    let baseStyle = { ...styles.base, ...style };
    if (focused) baseStyle = { ...baseStyle, borderColor: CT.BORDER_FOCUS };
    if (gapless) baseStyle = { ...baseStyle, marginBottom: 0 };

    // Handle input types
    let typeProps = {
        text: {},
        tel: { keyboardType: "phone-pad", textContentType: "telephoneNumber" },
        url: { keyboardType: "url", textContentType: "URL" },
        name: { autoCapitalize: "words", textContentType: type },
        email: { keyboardType: "email-address", autoCapitalize: "none", textContentType: "emailAddress" },
        number: { keyboardType: "number-pad" },
        password: { keyboardType: "visible-password", secureTextEntry: true, textContentType: "password" },
    };
    typeProps.phone = typeProps.tel;
    typeProps.username = typeProps.name;

    switch (type) {
        case "select":
            const [value, setValue] = useState();
            const { options = [], onChange, placeholder } = props;

            const _onValueChange = (value, index) => {
                setValue(value);
                if (typeof onChange === "function") onChange(value, index);
            };

            return (
                <View>
                    <Pressable style={baseStyle} onPress={_onPressFocusInput}>
                        <Text style={styles.label}>{label}</Text>
                        {/* <Text style={valueStyle}>{value ?? defaultValue ?? placeholder}</Text> */}
                        <Picker
                            ref={inputRef}
                            items={options}
                            value={value}
                            onOpen={CT.IS_IOS ? _onFocus : null}
                            onClose={CT.IS_IOS ? _onBlur : null}
                            placeholder={{}}
                            onValueChange={_onValueChange}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{
                                style: { ...styles.input },
                                placeholder: placeholder,
                                placeholderTextColor: phColor,
                                ...inputProps,
                            }}
                        />

                        {CT.IS_IOS && <Icon icon="caret-down" style={styles.caret} />}
                    </Pressable>
                    <FieldGuide type={type} guide={guide} strengthGuide={strengthGuide} />
                </View>
            );

        default:
            return (
                <View>
                    <Pressable style={baseStyle} onPress={_onPressFocusInput}>
                        <Text style={styles.label}>{label}</Text>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            onBlur={_onBlur}
                            onFocus={_onFocus}
                            placeholderTextColor={phColor}
                            {...typeProps[type]}
                            {...inputProps}
                        />
                    </Pressable>
                    <FieldGuide type={type} guide={guide} strengthGuide={strengthGuide} />
                </View>
            );
    }
}

const FieldGuide = ({ type, guide, strengthGuide }) => (
    <React.Fragment>
        {guide && <Text style={styles.guide}>{guide}</Text>}
        {type === "password" && strengthGuide && (
            <View style={styles.guide}>
                <View style={styles.strengthGuide}>
                    {_times(5, (i) => {
                        const backgroundColor = i <= 3 ? CT.CTA_POSITIVE : CT.BG_GRAY_200;
                        return <View key={i} style={{ ...styles.strengthOrb, backgroundColor }} />;
                    })}
                    <Text style={styles.strengthLabel}>Strong</Text>
                </View>
            </View>
        )}
    </React.Fragment>
);

const styles = StyleSheet.create({
    base: {
        ...CT.SHADOW_SM,
        padding: 10,
        position: "relative",
        borderColor: CT.BG_GRAY_100,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: CT.BG_WHITE,
    },
    label: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        color: CT.FONT_COLOR,
        fontSize: 18,
        fontWeight: "600",
    },
    caret: {
        top: "60%",
        right: 10,
        color: CT.BG_GRAY_200,
        position: "absolute",
    },
    guide: {
        color: CT.FONT_COLOR_LIGHT,
        textAlign: "justify",
        fontSize: 12,
        marginTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
    },
    strengthGuide: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        marginTop: 2,
    },
    strengthOrb: {
        width: 11,
        height: 11,
        marginRight: 2,
        borderRadius: 2,
        backgroundColor: CT.BG_GRAY_200,
    },
    strengthLabel: {
        color: CT.BG_GRAY_300,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 3,
    },
    picker: {
        position: "absolute",
    },
});

FloatingField.propTypes = {
    type: PropTypes.oneOf(CT.INPUT_TYPES),
    label: PropTypes.string,
    style: PropTypes.object,
    guide: PropTypes.any,
    options: PropTypes.array,
    gapless: PropTypes.bool,
    strengthGuide: PropTypes.bool,
};
