import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { KeyboardAvoidingView } from "react-native";

import _omit from "lodash/omit";

export default function KeyboardAvoiding(props) {
    const { style, children, behavior = CT.IS_IOS ? "padding" : null, keyboardVerticalOffset = 0 } = props;
    const appendedProps = _omit(props, ["style", "children", "behavior", "keyboardVerticalOffset"]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, ...style }}
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
            {...appendedProps}
        >
            {children}
        </KeyboardAvoidingView>
    );
}

KeyboardAvoiding.propTypes = {
    style: PropTypes.object,
    behavior: PropTypes.oneOf(["padding", "position", "height", null]),
    keyboardVerticalOffset: PropTypes.number,
};
