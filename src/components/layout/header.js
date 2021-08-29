import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet } from "react-native";

import _renderIf from "../../functions/renderIf";

const Header = ({ children, overlap = false, horizontal = false, style, contentStyle, contentProps, ...restProps }) => {
    if (horizontal) {
        contentProps = {
            horizontal: true,
            alwaysBounceHorizontal: true,
            showsHorizontalScrollIndicator: false,
        };
    }

    return (
        <View style={[styles.base, overlap ? { paddingBottom: 50 } : null, style]} {...restProps}>
            {_renderIf(
                horizontal,
                <ScrollView contentContainerStyle={[styles.content, contentStyle]} {...contentProps}>
                    {children}
                </ScrollView>,
                <View style={[styles.content, contentStyle]} {...contentProps}>
                    {children}
                </View>
            )}
        </View>
    );
};

Header.propTypes = {
    type: PropTypes.oneOf([0, 1, 2, 3]),
    style: PropTypes.object,
    overlap: PropTypes.bool,
    horizontal: PropTypes.bool,
    contentStyle: PropTypes.object,
    contentProps: PropTypes.object,
};

const styles = StyleSheet.create({
    base: {
        paddingBottom: 20,
        backgroundColor: CT.BG_PURPLE_900,
    },
    content: {
        display: "flex",
        paddingTop: 5,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        flexDirection: "row",
    },
});

export default Header;
