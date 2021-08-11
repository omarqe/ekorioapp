import React, { useContext } from "react";
import CT from "../const.js";
import Input from "./input";
import Context from "./context";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import _omit from "lodash/omit";

const Field = (props) => {
    const { type, label = "Input Label", last = false } = props;
    const context = useContext(Context.Fields);
    const appendedProps = _omit(props, ["type", "label", "last"]);
    const onPressShouldFocus = () => {
        const { ref } = context;
        if (ref !== undefined) {
            ref?.current.focus();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={onPressShouldFocus}>
            <View style={{ paddingBottom: last ? 0 : CT.FIELD_BOTTOM_SPACING }}>
                <Text style={styles.label}>{label}</Text>
                <Input type={type} {...appendedProps} />
            </View>
        </TouchableWithoutFeedback>
    );
};

Field.propTypes = {
    last: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
};

const styles = StyleSheet.create({
    label: {
        color: CT.BG_GRAY_500,
        fontWeight: "600",
        marginBottom: 5,
    },
});

export default Field;
