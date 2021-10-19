import React from "react";
import PetType from "./pet-type";
import PropTypes from "prop-types";
import { FlatList, StyleSheet } from "react-native";

export default function SpeciesList({ data = [], active, onPress, disabled = [] }) {
    const _keyExtractor = (item, index) => item + index;
    const _renderItem = ({ item }) => {
        const { id, name } = item;
        const isActive = id === active;

        return (
            <PetType
                id={id}
                name={name}
                style={styles.item}
                active={isActive}
                onPress={onPress}
                disabled={disabled.indexOf(id) > -1}
            />
        );
    };

    return (
        <FlatList
            data={data}
            style={styles.style}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            alwaysBounceHorizontal={false}
            showsHorizontalScrollIndicator={false}
            horizontal
        />
    );
}

const styles = StyleSheet.create({
    base: {
        marginLeft: -4,
    },
    item: {
        marginHorizontal: 2,
    },
});

SpeciesList.propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.number,
    onPress: PropTypes.func,
    disabled: PropTypes.arrayOf(PropTypes.number),
};
