import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Layout = (props) => {
    let { base = "white", withHeader = false, children } = props;
    const appendedProps = _omit(props, ["base", "children", "withHeader"]);

    const baseColor = { white: CT.BG_WHITE, gray: CT.BG_GRAY_50, purple: CT.BG_PURPLE_900 };
    const topStyle = { ...ss.mirage, top: 0, backgroundColor: withHeader ? baseColor.purple : baseColor[base] };
    const bottomStyle = { ...ss.mirage, bottom: 0, backgroundColor: baseColor[base] };

    return (
        <View style={ss.base} {...appendedProps}>
            <View style={topStyle} />
            <View style={bottomStyle} />
            <ScrollView contentContainerStyle={ss.bodyContentContainer}>{children}</ScrollView>
        </View>
    );
};

Layout.propTypes = {
    base: PropTypes.oneOf(["gray", "white", "purple"]),
    withHeader: PropTypes.bool,
};

const ss = StyleSheet.create({
    base: {
        flex: 1,
        position: "relative",
    },
    mirage: {
        width: "100%",
        height: "50%",
        position: "absolute",
    },
    bodyContentContainer: {
        flexGrow: 1,
    },
});

export default Layout;
