import React from "react";
import _omit from "lodash/omit";
import _split from "lodash/split";
import _isString from "lodash/isString";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Icon(props) {
    const realProps = _omit(props, ["icon", "data-name"]);

    // Determine correct icon name
    let icon = props?.icon;
    if (_isString(icon)) {
        const split = _split(icon, " ");
        icon = split.length > 1 ? split : icon;
    }

    return <FontAwesomeIcon icon={icon} data-name="icon" {...realProps} />;
}
