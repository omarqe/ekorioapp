import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Layout = (props) => {
    let { base = "white", gray = false, withHeader = false, scrollProps = {}, children } = props;
    const appendedProps = _omit(props, ["base", "children", "withHeader"]);

    if (gray) base = "gray";
    const baseColor = { white: CT.BG_WHITE, gray: CT.BG_GRAY_50, purple: CT.BG_PURPLE_900 };
    const topStyle = { ...styles.backdrop, top: 0, backgroundColor: withHeader ? baseColor.purple : baseColor[base] };
    const bottomStyle = { ...styles.backdrop, bottom: 0, backgroundColor: baseColor[base] };

    return (
        <View style={styles.base} {...appendedProps}>
            <View style={topStyle} />
            <View style={bottomStyle} />
            <ScrollView contentContainerStyle={styles.bodyContentContainer} {...scrollProps}>
                {children}
            </ScrollView>
        </View>
    );
};

Layout.propTypes = {
    base: PropTypes.oneOf(["gray", "white", "purple"]),
    gray: PropTypes.bool,
    withHeader: PropTypes.bool,
    scrollProps: PropTypes.object,
    contentProps: PropTypes.object,
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
        position: "relative",
    },
    backdrop: {
        width: "100%",
        height: "50%",
        position: "absolute",
    },
    bodyContentContainer: {
        flexGrow: 1,
    },
});

export default Layout;
