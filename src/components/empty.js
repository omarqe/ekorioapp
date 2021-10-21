import React from "react";
import Button from "./button";
import Heading from "./heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export default function Empty({ art: Art, artProps = {}, title, style, button, subtitle }) {
    return (
        <View style={[styles.base, style]}>
            {Art && <Art height={180} style={styles.art} {...artProps} />}
            <Heading size={0} style={styles.heading} text={title} subtitle={subtitle} />
            {button && (
                <View style={{ marginTop: 5 }}>
                    <Button small {...button} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    art: {
        marginBottom: 20,
    },
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
    art: PropTypes.func,
    artProps: PropTypes.object,
    title: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    button: PropTypes.object,
    subtitle: PropTypes.string,
};
