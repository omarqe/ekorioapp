import React from "react";
import CT from "../const.json";
import Input from "./input";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const Field = (props) => {
    const { type, label = "Input Label", last = false } = props;
    const appendedProps = _omit(props, ["type", "label", "last"]);

    return (
        <View style={{ paddingBottom: last ? 0 : CT.FIELD_BOTTOM_SPACING }}>
            <Text style={ss.label}>{label}</Text>
            <Input type={type} {...appendedProps} />
        </View>
    );
};

Field.propTypes = {
    last: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
};

const ss = StyleSheet.create({
    label: {
        color: CT.BG_GRAY_500,
        fontWeight: "600",
        marginBottom: 5,
    },
});

export default Field;
