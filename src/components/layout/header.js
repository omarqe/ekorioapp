import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _renderIf from "../../functions/renderIf";

const Header = (props) => {
    let { children, overlap = false, horizontal = false, contentStyle: cStyle = {}, contentProps = {} } = props;
    let appendedProps = _omit(props, ["children", "contentStyle"]);
    let contentStyle = { ...styles.content, ...cStyle };
    let baseStyle = styles.base;

    if (horizontal) {
        contentProps = {
            horizontal: true,
            alwaysBounceHorizontal: true,
            showsHorizontalScrollIndicator: false,
        };
    }

    if (overlap) {
        baseStyle = { ...baseStyle, paddingBottom: 50 };
    }

    return (
        <View style={baseStyle} {...appendedProps}>
            {_renderIf(
                horizontal,
                <ScrollView contentContainerStyle={contentStyle} {...contentProps}>
                    {children}
                </ScrollView>,
                <View style={contentStyle} {...contentProps}>
                    {children}
                </View>
            )}
        </View>
    );
};

Header.propTypes = {
    type: PropTypes.oneOf([0, 1, 2, 3]),
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
