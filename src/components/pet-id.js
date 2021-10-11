import React from "react";
import CT from "../const";
import Text from "./text";
import Icon from "./icon";
import Shimmer from "./shimmer";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import _isArray from "lodash/isArray";
import _renderIf from "../functions/renderIf";

const PetID = ({ label, value, style, verified = false, loading = false, labelStyle, valueStyle }) => {
    const valueIsArray = _isArray(value);

    let colors = [];
    if (valueIsArray) {
        value.map((color, i) => {
            colors = [...colors, <View key={i} style={{ ...styles.colorBlock, backgroundColor: color }} />];
        });
    }

    return (
        <View style={{ ...styles.base, ...style }}>
            {_renderIf(
                loading,
                <View style={[styles.valueBlock, { alignItems: "flex-start", flexDirection: "column" }]}>
                    <Shimmer width={70} height={10} style={{ marginBottom: 6 }} />
                    <Shimmer width={120} />
                </View>,
                <React.Fragment>
                    <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                    {_renderIf(
                        valueIsArray,
                        <View style={styles.colorBlocks}>{colors}</View>,
                        <View style={styles.valueBlock}>
                            <Text style={{ ...styles.value, ...valueStyle }}>{value}</Text>
                            {verified && <Icon icon="fas badge-check" style={styles.verified} />}
                        </View>
                    )}
                </React.Fragment>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    label: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 12,
        fontWeight: "500",
    },
    value: {
        color: CT.FONT_COLOR,
        position: "relative",
        fontSize: 15,
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
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    style: PropTypes.object,
    verified: PropTypes.bool,
    labelStyle: PropTypes.object,
    valueStyle: PropTypes.object,
};

export default PetID;
