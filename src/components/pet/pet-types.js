import React from "react";
import PetType from "./pet-type";
import PropTypes from "prop-types";
import { FlatList, StyleSheet } from "react-native";

export default function PetTypes({ types = [], active, onPress, disabled = [] }) {
    const _keyExtractor = (item, index) => item + index;
    const _renderItem = ({ item: type }) => {
        const isActive = active === type;
        return (
            <PetType
                type={type}
                style={styles.item}
                active={isActive}
                onPress={onPress}
                disabled={disabled.indexOf(type) > -1}
            />
        );
    };

    return (
        <FlatList
            data={types}
            style={styles.style}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            alwaysBounceHorizontal={false}
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

PetTypes.propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.arrayOf(PropTypes.string),
};
