import React from "react";
import CT from "../../const";
import PetID from "../pet-id";
import Button from "../button";
import Heading from "../heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import _chunk from "lodash/chunk";
import _clone from "lodash/clone";

const PetIdentity = ({ data: d, button = null, loading = false }) => {
    let data = _clone(d);
    if (loading) {
        data = [];
        for (let i = 0; i < 4; i++) {
            data = [...data, { label: "", value: "" }];
        }
    }

    const chunks = _chunk(data, 2);
    const badge = loading ? null : { text: data?.type ?? "Cat" };
    const subtitle = loading ? "Loading.." : "Family since 20 June 2021";

    return (
        <React.Fragment>
            <View style={styles.headingSection}>
                <Heading text="Pet Identity" subtitle={subtitle} badge={badge} gapless />
                {button && (
                    <View style={styles.actionBtnContainer}>
                        <Button small {...button} />
                    </View>
                )}
            </View>

            {chunks.map((items, i) => (
                <View key={i} style={{ ...styles.row, marginBottom: i === chunks.length - 1 ? 0 : 15 }}>
                    {items.map((props, j) => (
                        <PetID key={j} {...props} loading={loading} />
                    ))}
                </View>
            ))}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
    },
    column: {
        flex: 1,
    },
    kickerStyle: {
        color: CT.BG_GRAY_400,
        fontSize: 16,
    },
    actionBtnContainer: {
        marginLeft: "auto",
    },
    headingSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        flexDirection: "row",
    },
});

PetIdentity.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    button: PropTypes.object,
    loading: PropTypes.bool,
};

export default PetIdentity;
