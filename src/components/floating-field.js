import React, { useRef, useState } from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _times from "lodash/times";
export default function FloatingField(props) {
    const { type = null, label, guide, style = {}, onBlur, onFocus, strengthGuide = false, gapless = false } = props;
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const inputProps = _omit(props, ["type", "label", "style", "onBlur", "onFocus", "gapless"]);

    // Negates guide if strengthGuide is true
    if (strengthGuide && guide) guide = false;

    // Handle UX feedbacks
    const _onPressFocusInput = () => inputRef.current.focus();
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
        <View>
            <Pressable style={baseStyle} onPress={_onPressFocusInput}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    onBlur={_onBlur}
                    onFocus={_onFocus}
                    placeholderTextColor={CT.BG_GRAY_100}
                    {...typeProps}
                    {...inputProps}
                />
            </Pressable>
            {guide && <Text style={styles.guide}>{guide}</Text>}
            {type === "password" && strengthGuide && (
                <View style={styles.guide}>
                    <View style={styles.strengthGuide}>
                        {_times(5, (i) => {
                            const backgroundColor = i <= 3 ? CT.CTA_POSITIVE : CT.BG_GRAY_200;
                            return <View style={{ ...styles.strengthOrb, backgroundColor }} />;
                        })}
                        <Text style={styles.strengthLabel}>Strong</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        ...CT.SHADOW_SM,
        padding: 10,
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
});

FloatingField.propTypes = {
    type: PropTypes.oneOf(CT.INPUT_TYPES),
    label: PropTypes.string,
    style: PropTypes.object,
    guide: PropTypes.any,
    gapless: PropTypes.bool,
};
