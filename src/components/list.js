import React from "react";
import CT from "../const";
import Text from "./text";
import ListItem from "./list-item";
import PropTypes from "prop-types";
import { View, LogBox, FlatList, SectionList, StyleSheet } from "react-native";

import _isArray from "lodash/isArray";
import _findLastIndex from "lodash/findLastIndex";

LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);

export default function List({ list = [], sections = [], padded = false, onPress, ...restProps }) {
    const isSectioned = _isArray(sections) && sections.length > 0;
    const isListed = _isArray(list) && list.length > 0;

    const _renderSectionHeader = ({ section: { title } }) => <Text style={styles.name}>{title}</Text>;
    const _renderSectionFooter = ({ section: { note } }) => note && <Text style={styles.note}>{note}</Text>;
    const _keyExtractor = ({ text, subtitle }, index) => text + subtitle + index;
    const _renderItem = ({ item, index, section }) => {
        const _onPress = (index) => {
            if (typeof onPress === "function") {
                onPress(index);
            }
        };

        return (
            <ListItem
                last={index === _findLastIndex(isSectioned ? section?.data : list)}
                padded={padded}
                onPress={_onPress.bind(null, index)}
                {...item}
            />
        );
    };

    if (isSectioned) {
        return (
            <View style={styles.base}>
                <SectionList
                    sections={sections}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                    renderSectionHeader={_renderSectionHeader}
                    renderSectionFooter={_renderSectionFooter}
                    scrollEnabled={false}
                    bounces={false}
                    {...restProps}
                />
            </View>
        );
    } else if (isListed) {
        return (
            <View style={styles.base}>
                <FlatList
                    data={list}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                    scrollEnabled={false}
                    bounces={false}
                    {...restProps}
                />
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    name: {
        color: CT.BG_GRAY_600,
        fontWeight: "700",
        padding: 8,
        fontSize: 13,
        paddingHorizontal: CT.VIEW_PADDING_X,
    },
    note: {
        color: CT.BG_GRAY_400,
        fontSize: 12,
        textAlign: "justify",
        lineHeight: 16,
        paddingTop: 5,
        marginBottom: 15,
        paddingHorizontal: CT.VIEW_PADDING_X,
    },
    base: {
        flex: 1,
    },
});

List.propTypes = {
    padded: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
    sections: PropTypes.arrayOf(PropTypes.object),
};
