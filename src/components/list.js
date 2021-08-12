import React from "react";
import CT from "../const";
import ListItem from "./list-item";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _isArray from "lodash/isArray";

export default function List({ name, note, list = [] }) {
    if (_isArray(list) && list.length > 0) {
        return (
            <View>
                {name && <Text style={styles.name}>{name}</Text>}
                {list.map((props, i) => (
                    <ListItem key={i} last={i === list.length - 1} {...props} />
                ))}
                {note && <Text style={styles.note}>{note}</Text>}
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
        paddingTop: 8,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        marginBottom: 15,
    },
});

List.propTypes = {
    name: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
};
