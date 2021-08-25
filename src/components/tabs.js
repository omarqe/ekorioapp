import React, { useState } from "react";
import CT from "../const";
import Text from "./text";
import PropTypes from "prop-types";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";

import _omit from "lodash/omit";

export default function Tabs(props) {
    const { tabs = [], active = 0, onPress, onPressIn, onPressOut } = props;
    const appendedProps = _omit(props, ["tab", "active", "onPress", "onPressIn", "onPressOut"]);

    if (tabs?.length > 0) {
        const [pressedIndex, setPressedIndex] = useState(null);
        const _onPressIn = (index) => {
            setPressedIndex(index);
            if (typeof onPressIn === "function") {
                onPressIn(index);
            }
        };
        const _onPressOut = (index) => {
            setPressedIndex(index);
            if (typeof onPressOut === "function") {
                onPressOut(index);
            }
        };

        return (
            <ScrollView
                style={styles.base}
                contentContainerStyle={styles.baseContent}
                showsHorizontalScrollIndicator={false}
                horizontal
                {...appendedProps}
            >
                <View style={styles.content}>
                    {tabs.map((props, index) => {
                        const itemProps = _omit(props, ["text"]);
                        let textStyle = styles.text;
                        let itemStyle = {
                            ...styles.item,
                            marginLeft: index === 0 ? 0 : 2,
                            marginRight: index === tabs.length - 1 ? 0 : 2,
                        };
                        if (index === active) {
                            textStyle = { ...textStyle, color: CT.BG_PURPLE_100 };
                            itemStyle = { ...itemStyle, borderBottomColor: CT.BG_YELLOW_500 };
                        }
                        if (index === pressedIndex) {
                            itemStyle = { ...itemStyle, backgroundColor: CT.BG_PURPLE_800 };
                        }

                        return (
                            <Pressable
                                key={index}
                                style={itemStyle}
                                onPress={onPress.bind(null, index)}
                                onPressIn={_onPressIn}
                                onPressOut={_onPressOut}
                                {...itemProps}
                            >
                                <Text style={textStyle}>{props?.label}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        width: "100%",
        marginLeft: -CT.VIEW_PADDING_X,
        marginRight: -CT.VIEW_PADDING_X,
    },
    baseContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    item: {
        flex: 1,
        padding: 15,
        marginHorizontal: 5,
        paddingHorizontal: 8,
        borderBottomWidth: 3,
        borderBottomColor: CT.BG_PURPLE_900,
    },
    text: {
        color: CT.BG_PURPLE_400,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object),
    active: PropTypes.number,
    onPress: PropTypes.func,
};
