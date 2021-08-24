import React, { useState } from "react";
import CT from "../../const";

import Icon from "../icon";
import Badge from "../badge";
import Modal from "../modal";
import Heading from "../heading";
import PropTypes from "prop-types";

import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import _find from "lodash/find";
import _isArray from "lodash/isArray";

export default function HealthCategories({ data = [] }) {
    const [openID, setOpenID] = useState(null);
    const [pressedIndex, setPressedIndex] = useState(null);
    const current = _find(data, { id: openID });

    const _onPressOut = () => setPressedIndex(null);
    const _onPressIn = (index) => setPressedIndex(index);
    const _onClose = () => setOpenID(null);
    const _onPress = (id) => {
        if (_find(data, { id })) {
            setOpenID(id);
        }
    };

    if (_isArray(data) && data.length > 0) {
        return (
            <View style={styles.base}>
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
                    let itemStyle = { ...styles.item };
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
                                <View style={styles.badgeContainer}>
                                    <Badge text={`${score}/10`} textStyle={styles.badge} xs />
                                </View>
                                <Text style={styles.label}>{label}</Text>
                                <Icon icon="fas chevron-right" size={12} color={iconColor} style={styles.icon} />
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}

                <Modal
                    open={openID !== null}
                    title={current?.label}
                    badge={{ text: `${current?.score}/10`, color: "purple" }}
                    onClose={_onClose}
                    headingSize={2}
                    style={{ backgroundColor: CT.BG_GRAY_50 }}
                    headerStyle={styles.modalHeader}
                >
                    <View style={styles.section}>
                        <Heading text="Pet Factors" badge={{ text: current?.factors?.length }} style={styles.sectionHeading} />
                        <Text style={styles.factors}>
                            {(current?.factors ?? []).map(({ value, important }, i) => (
                                <Text key={i} style={[styles.factor, important ? styles.factorImportant : null]}>
                                    {value}
                                    <Text style={[styles.factorDot, important ? styles.factorDotImportant : null]}>
                                        {i === current?.factors?.length - 1 ? "" : " • "}
                                    </Text>
                                </Text>
                            ))}
                        </Text>
                    </View>
                    <View>
                        <Heading text="Explanation" style={styles.sectionHeading} />
                        <Text style={styles.factor}>{current?.explanation ?? "No explanation available."}</Text>
                    </View>
                </Modal>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
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
        color: CT.FONT_COLOR,
        fontWeight: "700",
    },
    badgeContainer: {
        display: "flex",
        minWidth: 39,
        marginRight: 8,
    },
    badge: {
        textAlign: "center",
    },

    section: {
        marginBottom: 25,
    },
    sectionHeading: {
        marginBottom: 6,
    },
    factors: {
        lineHeight: 24,
    },
    factor: {
        color: CT.BG_GRAY_600,
    },
    factorImportant: {
        color: CT.BG_GRAY_700,
        fontWeight: "700",
    },
    factorDot: {
        color: CT.BG_GRAY_200,
        fontWeight: "700",
    },
    factorDotImportant: {
        color: CT.BG_GRAY_200,
    },
    modalHeader: {
        paddingBottom: 25,
        backgroundColor: CT.BG_WHITE,
    },
});

HealthCategories.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};
