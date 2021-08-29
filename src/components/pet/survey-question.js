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
    let identity = {};
    Object.keys(pet).map((key) => {
        if (pet.hasOwnProperty(key)) {
            identity = { ...identity, [`{${key}}`]: pet[key] };
        }
    });

    // Convert checked value(s) to array
    if (!_isArray(values)) values = [values];

    // Replace question text with appropriate data (if any)
    const re = new RegExp(Object.keys(identity).join("|"), "gi");
    const kicker = ["Choose all that apply", "Choose one that applies"][type - 1] ?? "";
    const questionText = _replace(question, re, (key) => identity[key]);

    // Options renderer
    const _keyExtractor = ({ item }, index) => `${item?.id}_${index}`.toString();
    const _renderItem = ({ item }) => (
        <Option re={re} type={type} onPress={onPress} checked={values.indexOf(item?.id) > -1} identity={identity} {...item} />
    );

    return (
        <React.Fragment>
            <Heading kicker={kicker} text={questionText} style={styles.questionText} />
            <FlatList data={options} keyExtractor={_keyExtractor} renderItem={_renderItem} scrollEnabled={false} />
        </React.Fragment>
    );
}

const Option = ({ id: optionID, type, value, re, identity, checked = false, onPress }) => {
    const [pressed, setPressed] = useState(false);
    const [isChecked, setIsChecked] = useState(checked);

    const isRadio = type === 2;
    const icon = isRadio ? "circle" : "check";
    const optionText = _replace(value, re, (key) => identity[key]);
    const checkboxStyle = [
        styles.checkbox,
        isRadio ? styles.radio : null,
        checked ? styles.checkboxChecked : null,
        pressed && !isChecked ? styles.checkboxPressed : null,
    ];

    const _onPress = () => {
        if (typeof onPress === "function") {
            setIsChecked(!isChecked);
            onPress(optionID, !isChecked);
        }
    };

    return (
        <Pressable
            style={styles.option}
            onPress={_onPress}
            onPressIn={setPressed.bind(null, true)}
            onPressOut={setPressed.bind(null, false)}
        >
            <View style={checkboxStyle}>{checked && <Icon icon={`fas ${icon}`} size={12} color={CT.BG_WHITE} />}</View>
            <Text style={[styles.optionText, checked ? styles.optionTextChecked : null]}>{optionText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    questionText: {
        lineHeight: 28,
    },
    options: {
        paddingTop: 15,
    },
    option: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },
    optionText: {
        color: CT.BG_GRAY_400,
        fontSize: 16,
        fontWeight: "500",
    },
    optionTextChecked: {
        color: CT.FONT_COLOR,
    },
    checkbox: {
        width: 22,
        height: 22,
        marginRight: 8,
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
