import React from "react";
import CT from "../const.json";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const Header = (props) => {
    return (
        <View style={ss.base} {...props}>
            <Text style={{ color: CT.BG_PURPLE_300 }}>Header</Text>
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
