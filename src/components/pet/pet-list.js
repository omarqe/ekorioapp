import React from "react";
import Pet from "./";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _sortBy from "lodash/sortBy";
export default function PetList(props) {
    const { margin = 4, checked, active, onPress } = props;
    const _props = _omit(props, ["margin", "checked", "active", "add", "onPress", "onPressAdd"]);
    const data = _sortBy(
        [
            { id: 0, name: "Cleo", image: require("../../../assets/pets/cat-01.png") },
            { id: 1, name: "Oleo", image: require("../../../assets/pets/cat-02.png") },
            { id: 2, name: "Luna", image: require("../../../assets/pets/cat-03.png") },
            { id: 3, name: "Cheshire", image: require("../../../assets/pets/cat-04.png") },
            { id: 4, name: "Lucy", image: require("../../../assets/pets/cat-05.png") },
            { id: 5, name: "Lily", image: require("../../../assets/pets/cat-06.png") },
            { id: 6, name: "Ra", image: require("../../../assets/pets/cat-07.png") },
        ],
        "name"
    );

    const _renderItem = ({ item, index }) => {
        const { id, name, image } = item;
        return (
            <Pet
                name={name}
                image={image}
                style={{ marginHorizontal: margin }}
                active={id === active}
                checked={id === checked}
                onPress={typeof onPress === "function" ? onPress.bind(null, id, index) : null}
                {..._props}
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
    onPressAdd: PropTypes.func,
};
