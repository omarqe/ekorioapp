import React from "react";
import Pet from "./";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

import _clone from "lodash/clone";
import _sortBy from "lodash/sortBy";

export default function PetList({ data = [], margin = 4, loading = false, checked, active, onAddPet, onPress, ...restProps }) {
    if (loading) {
        data = [];
        active = null;
        for (let id = 0; id < 5; id++) {
            data = [...data, { id, loading }];
        }
    }

    data = _sortBy(data, "name");
    if (!loading) {
        data = [{ id: 0, name: "Add Pet", phIcon: "plus", onPress: onAddPet }, ...data];
    }

    const _renderItem = ({ item, index }) => {
        const { id, name, loading, imageURL, ...props } = item;
        return (
            <Pet
                name={name}
                image={imageURL}
                style={{ marginHorizontal: margin }}
                active={id === active}
                checked={id === checked}
                onPress={typeof onPress === "function" ? onPress.bind(null, id, index) : null}
                loading={loading}
                {...props}
                {...restProps}
            />
        );
    };

    return (
        <View style={[styles.container, { marginLeft: -margin }]}>
            <FlatList
                data={data}
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
