import React from "react";
import _split from "lodash/split";
import _isString from "lodash/isString";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Icon({ icon, ...restProps }) {
    if (_isString(icon)) {
        const split = _split(icon, " ");
        icon = split.length > 1 ? split : icon;
    }

    return <FontAwesomeIcon icon={icon} data-name="icon" {...restProps} />;
}
