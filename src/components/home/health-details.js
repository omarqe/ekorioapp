import React, { useState } from "react";
import CT from "../../const";
import Icon from "../icon";
import Badge from "../badge";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import _isArray from "lodash/isArray";

const HealthDetails = ({ data = [], onPress }) => {
    const [pressedIndex, setPressedIndex] = useState(null);
    const _onPress = (id) => {
        if (typeof onPress === "function") onPress(id);
    };
    const _onPressIn = (index) => setPressedIndex(index);
    const _onPressOut = () => setPressedIndex(null);
    console.log("pressedIndex", pressedIndex);

    if (_isArray(data) && data.length > 0) {
        return (
            <View style={ss.base}>
                {data.map(({ id, label, score }, i) => {
                    const isPressed = pressedIndex === i;
                    const iconColor = isPressed ? CT.BG_GRAY_300 : CT.BG_GRAY_200;
                    const props = {
                        key: i,
                        onPress: _onPress.bind(null, id),
                        onPressIn: _onPressIn.bind(null, i),
                        onPressOut: _onPressOut,
                    };

                    // Adjust item's borderRadius for the first and last items
                    let itemStyle = { ...ss.item };
                    if (i === 0) itemStyle = { ...itemStyle, borderTopLeftRadius: 7, borderTopRightRadius: 7 };
                    if (i === data.length - 1) {
                        itemStyle = {
                            ...itemStyle,
                            borderBottomWidth: 0,
                            borderBottomLeftRadius: 7,
                            borderBottomRightRadius: 7,
                        };
                    }

                    // When an item is pressed, show the feedback
                    if (isPressed) itemStyle = { ...itemStyle, backgroundColor: CT.BG_GRAY_50 };

                    return (
                        <TouchableWithoutFeedback {...props}>
                            <View style={itemStyle}>
                                <View style={ss.badgeContainer}>
                                    <Badge text={`${score}/10`} textStyle={ss.badge} xs />
                                </View>
                                <Text style={ss.label}>{label}</Text>
                                <Icon icon="fas chevron-right" size={12} color={iconColor} style={ss.icon} />
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        );
    }

    return null;
};

const ss = StyleSheet.create({
    base: {
        ...CT.SHADOW_SM,
        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        borderRadius: 8,
    },
    item: {
        display: "flex",
        padding: 10,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: CT.BG_WHITE,
        borderBottomWidth: 1,
        borderBottomColor: CT.BG_GRAY_50,
    },
    icon: {
        marginLeft: "auto",
    },
    label: {
        color: CT.BG_GRAY_700,
        fontWeight: "700",
    },
    badgeContainer: {
        display: "flex",
        minWidth: 40,
        marginRight: 10,
    },
    badge: {
        textAlign: "center",
    },
});

HealthDetails.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onPress: PropTypes.func,
};

export default HealthDetails;
