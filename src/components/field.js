import React, { useContext } from "react";
import CT from "../const.js";
import Text from "./text";
import Input from "./input";
import Context from "./context";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

const Field = ({ type, label = "Input Label", last = false, ...restProps }) => {
    const disabled = restProps?.disabled;
    const context = useContext(Context.Fields);
    const onPressShouldFocus = () => {
        const { ref } = context;
        if (ref !== undefined && !disabled) {
            ref?.current.focus();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={onPressShouldFocus}>
            <View style={{ paddingBottom: last ? 0 : CT.FIELD_BOTTOM_SPACING }}>
                <Text style={[styles.label, { opacity: disabled ? 0.6 : 1 }]}>{label}</Text>
                <Input type={type} {...restProps} />
            </View>
        </TouchableWithoutFeedback>
    );
};

Field.propTypes = {
    last: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
};

const styles = StyleSheet.create({
    label: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 5,
    },
});

export default Field;
