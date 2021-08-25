import React, { useState } from "react";
import CT from "../../const";

import Icon from "../icon";
import Text from "../text";
import Badge from "../badge";
import Modal from "../modal";
import Heading from "../heading";
import PropTypes from "prop-types";

import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import _find from "lodash/find";
import _isArray from "lodash/isArray";
import _renderIf from "../../functions/renderIf";
import _makeColor from "../../functions/makeColor";

export default function HealthCategories({ data = [] }) {
    const [openID, setOpenID] = useState(null);
    const [pressedIndex, setPressedIndex] = useState(null);

    const current = _find(data, { id: openID });
    const currentColor = _makeColor(current?.score, 10);

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
                    const color = _makeColor(score ?? 0, 10);
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
                                    <Badge
                                        text={`${score}/10`}
                                        style={{ backgroundColor: color?.background }}
                                        textStyle={{ ...styles.badge, color: color?.text }}
                                        xs
                                    />
                                </View>
                                <Text style={styles.label}>{label}</Text>
                                <Icon icon="fas chevron-right" size={12} color={iconColor} style={styles.icon} />
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}

                <Modal
                    headingSize={2}
                    headerStyle={styles.modalHeader}
                    onClose={_onClose}
                    title={current?.label}
                    open={openID !== null}
                    style={{ backgroundColor: CT.BG_GRAY_50 }}
                    badge={{
                        text: `${current?.score}/10`,
                        style: { backgroundColor: currentColor?.background },
                        textStyle: { color: currentColor?.text },
                    }}
                >
                    <View style={styles.section}>
                        <Heading
                            text="Pet Factors"
                            badge={{ text: current?.factors?.length ?? 0 }}
                            style={styles.sectionHeading}
                        />
                        <Text style={styles.factors}>
                            {_renderIf(
                                (current?.factors ?? [])?.length < 1,
                                <Text style={styles.factor}>No factor known.</Text>,
                                (current?.factors ?? []).map(({ value, important }, i) => (
                                    <Text key={i} style={[styles.factor, important ? styles.factorImportant : null]}>
                                        {value}
                                        <Text style={[styles.factorDot, important ? styles.factorDotImportant : null]}>
                                            {i === current?.factors?.length - 1 ? "" : " • "}
                                        </Text>
                                    </Text>
                                ))
                            )}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Heading text="Explanation" style={styles.sectionHeading} />
                        <Text style={[styles.factor, { lineHeight }]}>
                            {current?.explanation ?? "No explanation available."}
                        </Text>
                    </View>
                </Modal>
            </View>
        );
    }

    return null;
}

const lineHeight = 22;
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
        lineHeight,
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
