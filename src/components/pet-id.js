import React from "react";
import CT from "../const";
import Icon from "./icon";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _isArray from "lodash/isArray";
import _renderIf from "../functions/renderIf";

const PetID = ({ label, value, style, labelStyle, valueStyle, verified = false }) => {
    const valueIsArray = _isArray(value);

    let colors = [];
    if (valueIsArray) {
        value.map((color, i) => {
            colors = [...colors, <View key={i} style={{ ...ss.colorBlock, backgroundColor: color }} />];
        });
    }

    return (
        <View style={{ ...ss.base, ...style }}>
            <Text style={{ ...ss.label, ...labelStyle }}>{label}</Text>
            {_renderIf(
                valueIsArray,
                <View style={ss.colorBlocks}>{colors}</View>,
                <View style={ss.valueBlock}>
                    <Text style={{ ...ss.value, ...valueStyle }}>{value}</Text>
                    {verified && <Icon icon="fas badge-check" style={ss.verified} />}
                </View>
            )}
        </View>
    );
};

const ss = StyleSheet.create({
    base: {
        flex: 1,
    },
    label: {
        color: CT.BG_GRAY_400,
        fontSize: 14,
        fontWeight: "500",
    },
    value: {
        color: CT.BG_GRAY_700,
        position: "relative",
        fontSize: 18,
        fontWeight: "700",
    },
    valueBlock: {
        display: "flex",
        paddingTop: 2,
        alignItems: "center",
        flexDirection: "row",
    },
    colorBlocks: {
        display: "flex",
        paddingTop: 2,
        flexDirection: "row",
    },
    colorBlock: {
        width: 17,
        height: 17,
        marginRight: 2,
        borderRadius: 5,
    },
    verified: {
        color: CT.BG_VERIFIED,
        fontSize: 12,
        position: "relative",
        marginLeft: 3,
    },
});

PetID.propTypes = {
    verified: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    valueStyle: PropTypes.object,
};

export default PetID;
