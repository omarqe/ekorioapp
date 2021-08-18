import React from "react";
import Pet from "./";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

import _omit from "lodash/omit";
export default function PetList(props) {
    const { checked, onPress } = props;
    const _props = _omit(props, ["checked", "add", "onPress", "onPressAdd"]);
    const data = [
        { id: 0, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 1, name: "Chester", image: require("../../../assets/pet-sample.png") },
        { id: 2, name: "Helios", image: require("../../../assets/pet-sample.png") },
        { id: 3, name: "Agemon", image: require("../../../assets/pet-sample.png") },
        { id: 4, name: "Momon", image: require("../../../assets/pet-sample.png") },
    ];

    const _renderItem = ({ item, index }) => {
        const { id, name } = item;
        return (
            <Pet
                name={name}
                style={{ marginHorizontal: 2 }}
                checked={id === checked}
                onPress={typeof onPress === "function" ? onPress.bind(null, index) : null}
                {..._props}
            />
        );
    };

    return (
        <View style={styles.container}>
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
    checked: PropTypes.number,
    onPressAdd: PropTypes.func,
};
