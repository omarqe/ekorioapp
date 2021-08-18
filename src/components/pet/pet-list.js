import React from "react";
import Pet from "./";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

import _omit from "lodash/omit";
export default function PetList(props) {
    const { margin = 4, checked, active, onPress } = props;
    const _props = _omit(props, ["margin", "checked", "active", "add", "onPress", "onPressAdd"]);
    const data = [
        { id: 0, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 1, name: "Chester", image: require("../../../assets/pet-sample.png") },
        { id: 2, name: "Helios", image: require("../../../assets/pet-sample.png") },
        { id: 3, name: "Agemon", image: require("../../../assets/pet-sample.png") },
        { id: 4, name: "Momon", image: require("../../../assets/pet-sample.png") },
        { id: 5, name: "Momon", image: require("../../../assets/pet-sample.png") },
        { id: 6, name: "Momon", image: require("../../../assets/pet-sample.png") },
        { id: 7, name: "Momon", image: require("../../../assets/pet-sample.png") },
        { id: 8, name: "Momon", image: require("../../../assets/pet-sample.png") },
        { id: 9, name: "Momon", image: require("../../../assets/pet-sample.png") },
    ];

    const _renderItem = ({ item, index }) => {
        const { id, name } = item;
        return (
            <Pet
                name={name}
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
