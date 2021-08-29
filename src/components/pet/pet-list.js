import React from "react";
import Pet from "./";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

import pets from "../../../data/pets.json";
import _sortBy from "lodash/sortBy";
export default function PetList({ data = null, margin = 4, checked, active, onPress, ...restProps }) {
    const _renderItem = ({ item, index }) => {
        const { id, name, imageURL } = item;
        return (
            <Pet
                name={name}
                image={imageURL}
                style={{ marginHorizontal: margin }}
                active={id === active}
                checked={id === checked}
                onPress={typeof onPress === "function" ? onPress.bind(null, id, index) : null}
                {...restProps}
            />
        );
    };

    return (
        <View style={[styles.container, { marginLeft: -margin }]}>
            <FlatList
                data={_sortBy(data ?? pets, "name")}
                style={{ overflow: "visible" }}
                renderItem={_renderItem}
                keyExtractor={({ id }) => id.toString()}
                contentContainerStyle={styles.base}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    container: {
        marginLeft: -3,
    },
});

PetList.propTypes = {
    add: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    margin: PropTypes.number,
    active: PropTypes.number,
    checked: PropTypes.number,
    onPress: PropTypes.func,
    deemphasized: PropTypes.bool,
};
