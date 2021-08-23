import React from "react";
import PropTypes from "prop-types";
import FloatingField from "./floating-field";
import { View, StyleSheet } from "react-native";

import _get from "lodash/get";
import _omit from "lodash/omit";
import _isArray from "lodash/isArray";

export default function FloatingFields(props) {
    const { fields = [] } = props;
    const generalProps = _omit(props, ["fields"]);

    if (_isArray(fields) && fields.length > 0) {
        return (
            <View style={styles.grid}>
                {fields.map((props, i) => {
                    const isLast = i === fields.length - 1;
                    const rowStyle = { ...styles.row, marginBottom: isLast ? 0 : 10 };

                    if (_isArray(props)) {
                        const firstField = _get(props, "[0]", null);
                        const secondField = _get(props, "[1]", null);

                        if (!firstField && !secondField) return null;

                        return (
                            <View key={i} style={rowStyle}>
                                <View style={styles.column}>
                                    <FloatingField gapless {...generalProps} {...firstField} />
                                </View>
                                {secondField && (
                                    <View style={styles.column}>
                                        <FloatingField gapless {...generalProps} {...secondField} />
                                    </View>
                                )}
                            </View>
                        );
                    }

                    return (
                        <View key={i} style={rowStyle}>
                            <View style={styles.column}>
                                <FloatingField gapless {...generalProps} {...props} />
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    grid: {
        marginLeft: -5,
        marginRight: -5,
    },
    row: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
    },
    column: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

FloatingFields.propTypes = {
    fields: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};
