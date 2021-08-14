import React from "react";
import Heading from "./heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export default function Empty({ title, subtitle }) {
    return (
        <View style={styles.base}>
            <Heading size={1} style={styles.heading} text={title} subtitle={subtitle} />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        display: "flex",
        alignItems: "center",
    },
});

Empty.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};
