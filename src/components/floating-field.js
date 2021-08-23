import React, { useRef, useState } from "react";
import CT from "../const";

import Icon from "./icon";
import RNPicker from "react-native-picker-select";
import PropTypes from "prop-types";
import ModalPicker from "./modal-picker";

import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _find from "lodash/find";
import _times from "lodash/times";
import _renderIf from "../functions/renderIf";
export default function FloatingField(props) {
    const [picker, setPicker] = useState(false);
    const [focused, setFocused] = useState(false);

    const { disabled = false, gapless = false, strengthGuide = false, useNativePicker = false } = props;
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
            useNativePicker ? inputRef?.current?.togglePicker(true) : setPicker(true);
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
    if (type === "textarea") baseStyle = { ...baseStyle, minHeight: 120 };

    // Handle input types
    let typeProps = {
        text: {},
        tel: { keyboardType: "phone-pad", textContentType: "telephoneNumber" },
        url: { keyboardType: "url", textContentType: "URL" },
        name: { autoCapitalize: "words", textContentType: type },
        email: { keyboardType: "email-address", autoCapitalize: "none", textContentType: "emailAddress" },
        number: { keyboardType: "number-pad" },
        password: { keyboardType: "visible-password", secureTextEntry: true, textContentType: "password" },
        textarea: { multiline: true },
    };
    typeProps.phone = typeProps.tel;
    typeProps.username = typeProps.name;

    switch (type) {
        case "select":
            const { value, options = [], onChange, placeholder } = props;
            const textColor = { color: value ? CT.FONT_COLOR : CT.BG_GRAY_100 };
            const valueLabel = _find(options, { value })?.label;

            const _onValueChange = (value, index) => {
                if (typeof onChange === "function") {
                    onChange(value, index);
                }
            };

            return (
                <View>
                    <Pressable style={baseStyle} onPress={_onPressFocusInput}>
                        <Text style={styles.label}>{label}</Text>
                        {_renderIf(
                            useNativePicker,
                            <RNPicker
                                ref={inputRef}
                                items={options}
                                value={value}
                                onOpen={CT.IS_IOS ? _onFocus : null}
                                onClose={CT.IS_IOS ? _onBlur : null}
                                placeholder={{}}
                                onValueChange={_onValueChange}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{
                                    style: styles.input,
                                    allowFontScaling: false,
                                    placeholder: placeholder,
                                    placeholderTextColor: phColor,
                                    ...inputProps,
                                }}
                            />,
                            <React.Fragment>
                                <Text style={[styles.input, textColor]} allowFontScaling={false}>
                                    {valueLabel ?? placeholder ?? "Please select"}
                                </Text>
                                <ModalPicker
                                    selectedValue={value}
                                    open={picker}
                                    label={label}
                                    options={options}
                                    onClose={setPicker.bind(null, false)}
                                    onValueChange={_onValueChange}
                                />
                            </React.Fragment>
                        )}

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
                            editable={!disabled}
                            allowFontScaling={false}
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
        fontSize: 15,
        fontWeight: "600",
    },
    inputMimic: {
        fontSize: 18,
    },
    caret: {
        top: "60%",
        right: 10,
        color: CT.BG_GRAY_200,
        position: "absolute",
    },
    guide: {
        color: CT.BG_GRAY_400,
        fontSize: 12,
        marginTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 16,
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
    onChange: PropTypes.func,
    strengthGuide: PropTypes.bool,
    useNativePicker: PropTypes.bool,
};
