import React from "react";
import CT from "../const";
import ListItem from "./list-item";
import PropTypes from "prop-types";
import { View, Text, LogBox, FlatList, SectionList, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _isArray from "lodash/isArray";
import _findLastIndex from "lodash/findLastIndex";

LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);

export default function List(props) {
    const { list = [], sections = [] } = props;
    const _props = _omit(props, ["list", "sections"]);
    const isSectioned = _isArray(sections) && sections.length > 0;
    const isListed = _isArray(list) && list.length > 0;

    const _renderSectionHeader = ({ section: { title } }) => <Text style={styles.name}>{title}</Text>;
    const _renderSectionFooter = ({ section: { note } }) => note && <Text style={styles.note}>{note}</Text>;
    const _keyExtractor = ({ text, subtitle }) => text + subtitle;
    const _renderItem = ({ item, index, section }) => (
        <ListItem last={index === _findLastIndex(isSectioned ? section?.data : list)} {...item} />
    );

    if (isSectioned) {
        return (
            <View>
                <SectionList
                    sections={sections}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                    renderSectionHeader={_renderSectionHeader}
                    renderSectionFooter={_renderSectionFooter}
                    scrollEnabled={false}
                    bounces={false}
                    {..._props}
                />
            </View>
        );
    } else if (isListed) {
        return (
            <View>
                <FlatList
                    data={list}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                    scrollEnabled={false}
                    bounces={false}
                    {..._props}
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
        padding: 10,
        fontSize: 16,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
    },
    note: {
        lineHeight: 20,
        textAlign: "justify",
        color: CT.BG_GRAY_400,
        paddingTop: 5,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        marginBottom: 15,
    },
});

List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    sections: PropTypes.arrayOf(PropTypes.object),
};
