import React from "react";
import CT from "../../const.json";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Header = (props) => {
    const { children } = props;
    const appendedProps = _omit(props, ["children"]);

    return (
        <View style={ss.base} {...appendedProps}>
            {children}
        </View>
    );
};

Header.propTypes = {
    type: PropTypes.oneOf([0, 1, 2, 3]),
};

const ss = StyleSheet.create({
    base: {
        paddingTop: 10,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        paddingBottom: 50,
        backgroundColor: CT.BG_PURPLE_900,
    },
});

export default Header;
