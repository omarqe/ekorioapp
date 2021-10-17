import React from "react";
import Button from "./button";
import Heading from "./heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export default function Empty({ art: Art, title, style, button, subtitle }) {
    return (
        <View style={[styles.base, style]}>
            {Art && <Art />}
            <Heading size={0} style={styles.heading} text={title} subtitle={subtitle} />
            {button && (
                <View style={{ marginTop: 5 }}>
                    <Button {...button} small />
                </View>
            )}
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
    art: PropTypes.object,
    title: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    button: PropTypes.object,
    subtitle: PropTypes.string,
};
