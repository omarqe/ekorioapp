import React, { useRef, useState } from "react";
import CT from "../const";

import Icon from "./icon";
import Text from "./text";
import PropTypes from "prop-types";
import ModalPicker from "./modal-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";
import { View, Image, Pressable, TextInput, StyleSheet } from "react-native";
import { countries } from "countries-list";

import _find from "lodash/find";
import _times from "lodash/times";
import _uniqBy from "lodash/uniqBy";
import _moment from "moment";
import _sortBy from "lodash/sortBy";
import _lowerCase from "lodash/lowerCase";
import _renderIf from "../functions/renderIf";
export default function FloatingField({
    disabled = false,
    gapless = false,
    strengthGuide = false,
    useNativePicker = false,
    name,
    value,
    type = null,
    label,
    guide,
    style = {},
    onBlur,
    onFocus,
    onChange,
    options = [],
    placeholder,
    dateProps,
    dateFormat = "DD/MM/YYYY",
    nameCC, // Only works for type=select
    callingCode = CT.DEFAULT_CALLING_CODE, // Only works for type=select
    ...restProps
}) {
    const [picker, setPicker] = useState(false);
    const [datePicker, setDatePicker] = useState(false);
    const [focused, setFocused] = useState(false);
    const [ccPicker, setCCPicker] = useState(false);
    const [inputLayout, setInputLayout] = useState({ width: 0, height: 0 });

    // Generate calling code options
    const callingCodes = Object.keys(countries).map((key) => {
        if (countries.hasOwnProperty(key)) {
            const { phone, name } = countries[key];
            return { value: parseInt(phone), label: `${name} (+${phone})`, abbrv: key };
        }
    });
    const countryAbbrv = _lowerCase(_find(callingCodes, { value: callingCode })?.abbrv);
    const countryFlag = { uri: `https://countryflags.io/${countryAbbrv}/flat/64.png` };
    const sortedCallingCodes = _uniqBy(_sortBy(callingCodes, "label"), "value");

    const phColor = disabled ? CT.BG_GRAY_100 : CT.BG_GRAY_100;
    const isSelect = type === "select";
    const isDatePicker = type === "date";
    const inputRef = useRef(null);
    const callingCodeRef = useRef(null);

    // Negates guide if strengthGuide is true
    if (strengthGuide && guide) guide = false;

    // Find input width and height
    const _onInputLayout = (e) => {
        const { width, height } = e.nativeEvent.layout || {};
        setInputLayout({ width, height });
    };

    // Handle UX feedbacks
    const _onPressFocusInput = () => {
        if (disabled) return;
        if (isSelect) {
            useNativePicker || CT.IS_ANDROID ? inputRef?.current?.focus() : setPicker(true);
            return;
        } else if (isDatePicker) {
            setDatePicker(true);
            return;
        }

        inputRef?.current?.focus();
    };
    const _onFocus = () => {
        if (!disabled) {
            setFocused(true);
            if (typeof onFocus === "function") onFocus();
        }
    };
    const _onBlur = () => {
        if (!disabled) {
            setFocused(false);
            if (typeof onBlur === "function") onBlur();
        }
    };
    const _onValueChange = (value) => {
        if (!disabled && typeof onChange === "function") {
            onChange(value, name);
        }
    };
    const _onDateChange = (e, selectedDate) => {
        setDatePicker(false);
        if (!disabled && typeof onChange === "function") {
            const currentDate = selectedDate || value;
            onChange(currentDate, name);
        }
    };
    const _onCallingCodeChange = (value) => {
        if (!disabled && typeof onChange === "function") {
            onChange(value, nameCC);
        }
    };
    const _onOpenCallingCode = () => {
        CT.IS_ANDROID ? callingCodeRef?.current?.focus() : setCCPicker(true);
    };

    // Correct value type
    if (typeof value === "number") value = value.toString();

    // Handle styles
    let baseStyle = { ...styles.base, ...style };
    let disabledStyle = {};
    let disabledLabelStyle = {};
    if (focused) baseStyle = { ...baseStyle, borderColor: CT.BORDER_FOCUS };
    if (gapless) baseStyle = { ...baseStyle, marginBottom: 0 };
    if (type === "textarea") baseStyle = { ...baseStyle, minHeight: 120 };
    if (disabled) {
        disabledStyle = { shadowOpacity: 0, opacity: 0.7 };
        disabledLabelStyle = { color: CT.BG_GRAY_300 };
    }

    // Handle input types
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

    // For type=date && type=select

    switch (type) {
        case "date":
        case "select":
            const formattedDate = value instanceof Date ? _moment(value).format(dateFormat).toString() : value;

            const valueLabel = isDatePicker ? formattedDate : _find(options, { value })?.label;
            const textColor = { color: !valueLabel || disabled ? phColor : CT.FONT_COLOR };
            const textRightPadding = { paddingRight: 20 };
            const pickerProps = { ref: inputRef, selectedValue: value, onValueChange: _onValueChange, style: styles.picker };
            const valueProps = {
                style: [styles.input, textColor, textRightPadding, { top: CT.IS_ANDROID ? -3 : 0 }],
                numberOfLines: 1,
                allowFontScaling: false,
            };

            return (
                <View onLayout={_onInputLayout}>
                    <Pressable style={[baseStyle, disabledStyle]} onPress={_onPressFocusInput}>
                        <Text style={[styles.label, disabledLabelStyle, textRightPadding]}>{label}</Text>
                        <Text {...valueProps}>{valueLabel ?? placeholder ?? "Please select"}</Text>

                        {_renderIf(
                            !isDatePicker,
                            _renderIf(
                                CT.IS_ANDROID,
                                <Picker {...pickerProps}>
                                    {options.map(({ label, value }, i) => (
                                        <Picker.Item key={i} label={label} value={value} />
                                    ))}
                                </Picker>,
                                <ModalPicker
                                    selectedValue={value}
                                    open={picker}
                                    label={label}
                                    options={options}
                                    onClose={setPicker.bind(null, false)}
                                    onDateChange={_onDateChange}
                                    onValueChange={_onValueChange}
                                />
                            ),
                            _renderIf(
                                datePicker || CT.IS_IOS,
                                <View style={CT.IS_IOS ? [styles.dateTimePicker, inputLayout] : null}>
                                    <DateTimePicker
                                        mode="date"
                                        value={value}
                                        display="default"
                                        onChange={_onDateChange}
                                        {...dateProps}
                                    />
                                </View>
                            )
                        )}
                        <Icon icon={isDatePicker ? "far calendar-alt" : "caret-down"} style={styles.caret} />
                    </Pressable>
                    <FieldGuide type={type} guide={guide} strengthGuide={strengthGuide} />
                </View>
            );

        default:
            const alignItems = type === "textarea" ? "flex-start" : "center";

            return (
                <View>
                    <Pressable style={[baseStyle, disabledStyle]} onPress={_onPressFocusInput}>
                        <Text style={[styles.label, disabledLabelStyle]}>{label}</Text>
                        <View style={[styles.inputContainer, { alignItems }]}>
                            {_renderIf(
                                ["tel", "phone"].indexOf(type) > -1, // Calling Code Picker
                                <Pressable style={styles.callingCodes} onPress={_onOpenCallingCode}>
                                    <View style={styles.countryFlagContainer}>
                                        <Image source={countryFlag} style={styles.countryFlag} />
                                    </View>
                                    <Text style={styles.callingCode} allowFontScaling={false}>
                                        +{callingCode}
                                    </Text>
                                    <Icon icon="caret-down" style={styles.callingCodesCaret} />
                                    {_renderIf(
                                        CT.IS_ANDROID,
                                        <Picker
                                            ref={callingCodeRef}
                                            style={styles.picker}
                                            onValueChange={_onCallingCodeChange}
                                            selectedValue={callingCode}
                                        >
                                            {sortedCallingCodes.map(({ label, value }, i) => (
                                                <Picker.Item key={i} label={label} value={value} />
                                            ))}
                                        </Picker>,
                                        <ModalPicker
                                            selectedValue={callingCode}
                                            open={ccPicker}
                                            label="Calling Codes"
                                            options={sortedCallingCodes}
                                            onClose={setCCPicker.bind(null, false)}
                                            onValueChange={_onCallingCodeChange}
                                        />
                                    )}
                                </Pressable>
                            )}
                            <TextInput
                                ref={inputRef}
                                value={value}
                                style={[styles.input, type === "textarea" ? { height: "auto" } : null]}
                                onBlur={_onBlur}
                                onFocus={_onFocus}
                                editable={!disabled}
                                placeholder={placeholder}
                                onChangeText={_onValueChange}
                                allowFontScaling={false}
                                placeholderTextColor={phColor}
                                {...typeProps[type]}
                                {...restProps}
                            />
                        </View>
                    </Pressable>
                    <FieldGuide type={type} guide={guide} disabled={disabled} strengthGuide={strengthGuide} />
                </View>
            );
    }
}

const FieldGuide = ({ type, guide, disabled, strengthGuide }) => (
    <React.Fragment>
        {guide && <Text style={[styles.guide, { color: disabled ? CT.BG_GRAY_200 : CT.BG_GRAY_400 }]}>{guide}</Text>}
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
    dateTimePicker: {
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        opacity: CT.IS_IOS ? 0 : 1,
        position: "absolute",
        paddingTop: 11,
    },
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
        fontSize: 12,
        marginBottom: 5,
    },
    input: {
        flex: 1,
        color: CT.FONT_COLOR,
        height: CT.LOW_RESOLUTION ? 20 : 18,
        fontSize: CT.LOW_RESOLUTION ? 16 : 15,
        fontWeight: "600",
        fontFamily: CT.IS_ANDROID ? "Inter_600SemiBold" : null,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
    },

    countryFlag: {
        width: 21,
        height: 15,
    },
    countryFlagContainer: {
        width: 21,
        height: 15,
        marginRight: 5,
        borderRadius: 5,
        ...CT.SHADOW_sm,
    },
    callingCode: {
        top: CT.IS_ANDROID ? -3 : 0,
        color: CT.FONT_COLOR,
        height: CT.LOW_RESOLUTION ? 20 : 18,
        fontSize: CT.LOW_RESOLUTION ? 16 : 15,
        fontWeight: "600",
    },
    callingCodes: {
        alignItems: "center",
        marginRight: 5,
        flexDirection: "row",
    },
    callingCodesCaret: {
        top: CT.IS_ANDROID ? -1 : 0,
        color: CT.BG_GRAY_200,
        marginLeft: 1,
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
        opacity: 0,
        backgroundColor: CT.BG_WHITE,
    },
});

FloatingField.propTypes = {
    callingCode: PropTypes.number,
    nameCC: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(CT.INPUT_TYPES),
    label: PropTypes.string,
    style: PropTypes.object,
    guide: PropTypes.any,
    options: PropTypes.array,
    gapless: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    strengthGuide: PropTypes.bool,
    useNativePicker: PropTypes.bool,
    dateProps: PropTypes.object,
    dateFormat: PropTypes.string,
};
