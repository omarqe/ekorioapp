import React, { useState } from "react";
import CT from "../../const";

import Icon from "../icon";
import Text from "../text";
import Heading from "../heading";
import PropTypes from "prop-types";

import { View, Pressable, FlatList, StyleSheet } from "react-native";

import _replace from "lodash/replace";
import _isArray from "lodash/isArray";

export default function SurveyQuestion({ pet, type = 1, options, question, values, onPress }) {
    const [contentWidth, setContentWidth] = useState(0);
    const _onContentLayout = (e) => setContentWidth(e?.nativeEvent?.layout?.width);

    let identity = {};
    Object.keys(pet).map((key) => {
        if (pet.hasOwnProperty(key)) {
            identity = { ...identity, [`{${key}}`]: pet[key] };
        }
    });

    // Gender pronouns
    identity["{genderPronoun}"] = pet?.gender === "male" ? "he" : "she";
    identity["{genderPronoun2}"] = pet?.gender === "male" ? "him" : "her";
    identity["{genderPronoun3}"] = pet?.gender === "male" ? "his" : "her";

    // Convert checked value(s) to array
    if (!_isArray(values)) values = [values];

    // Replace question text with appropriate data (if any)
    const re = new RegExp(Object.keys(identity).join("|"), "gi");
    const kicker = ["Choose all that apply", "Choose one that applies"][type - 1] ?? "";
    const questionText = _replace(question, re, (key) => identity[key]);

    // Options renderer
    const _keyExtractor = ({ item }, index) => `${item?.id}_${index}`.toString();
    const _renderItem = ({ item }) => (
        <Option
            re={re}
            type={type}
            width={contentWidth}
            onPress={onPress}
            checked={values.indexOf(item?.id) > -1}
            identity={identity}
            {...item}
        />
    );

    return (
        <View onLayout={_onContentLayout}>
            <Heading kicker={kicker} text={questionText} textStyle={styles.questionText} />
            <FlatList
                data={options}
                style={styles.options}
                contentContainerStyle={styles.optionsContent}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                scrollEnabled={false}
            />
        </View>
    );
}

const Option = ({ id: optionID, type, value, image = null, re, width, identity, checked = false, onPress }) => {
    const [pressed, setPressed] = useState(false);

    const isRadio = type === 2;
    const icon = isRadio ? "circle" : "check";
    const optionText = _replace(value, re, (key) => identity[key]);
    const optionTextWidth = { width: width - (styles.checkbox.width + styles.checkbox.marginRight) };

    const checkboxStyle = [
        styles.checkbox,
        isRadio ? styles.radio : null,
        checked ? styles.checkboxChecked : null,
        pressed && !checked ? styles.checkboxPressed : null,
    ];

    const _onPress = () => {
        if (typeof onPress === "function") {
            onPress(optionID, !checked);
        }
    };

    return (
        <Pressable onPress={_onPress} onPressIn={setPressed.bind(null, true)} onPressOut={setPressed.bind(null, false)}>
            {image && <View style={styles.image} />}
            <View style={styles.option}>
                <View style={checkboxStyle}>{checked && <Icon icon={`fas ${icon}`} size={12} color={CT.BG_WHITE} />}</View>
                <Text style={[styles.optionText, checked ? styles.optionTextChecked : null, optionTextWidth]}>
                    {optionText}
                </Text>
            </View>
        </Pressable>
    );
};

const { SMALL_SCREEN } = CT;
const styles = StyleSheet.create({
    questionText: {
        lineHeight: 22,
    },
    options: {
        marginHorizontal: -20,
    },
    optionsContent: {
        paddingHorizontal: 20,
    },
    option: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: SMALL_SCREEN ? 8 : 10,
    },
    image: {
        width: "100%",
        height: 150,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: CT.BG_GRAY_50,
    },
    optionText: {
        color: CT.BG_GRAY_400,
        fontSize: SMALL_SCREEN ? 12 : 13,
        fontWeight: "500",
        lineHeight: SMALL_SCREEN ? 17 : 18,
    },
    optionTextChecked: {
        color: CT.FONT_COLOR,
    },
    checkbox: {
        width: 22,
        height: 22,
        marginRight: 10,
        borderRadius: 8,
        backgroundColor: CT.BG_GRAY_100,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: CT.CTA_POSITIVE,
    },
    checkboxPressed: {
        backgroundColor: CT.BG_GRAY_200,
    },
    radio: {
        borderRadius: 22,
    },
});

SurveyQuestion.propTypes = {
    pet: PropTypes.object,
    type: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.object),
    checked: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    question: PropTypes.string,
    onPress: PropTypes.func,
};
