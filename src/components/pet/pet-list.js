import React from "react";
import PetOrb from "./pet-orb";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

export default function PetList({ checked, switcher }) {
    const data = [
        { id: 0, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 1, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 2, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 3, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 4, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 5, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 6, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 7, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
        { id: 8, name: "Cheshire", image: require("../../../assets/pet-sample.png") },
    ];

    const _renderItem = ({ item }) => {
        const { id } = item;
        const isChecked = id === checked;
        return <PetOrb checked={isChecked} switcher={switcher} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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
    checked: PropTypes.number,
    switcher: PropTypes.bool,
};
