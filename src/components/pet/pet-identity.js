import React from "react";
import CT from "../../const";
import PetID from "../pet-id";
import Button from "../button";
import Heading from "../heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import _chunk from "lodash/chunk";

const PetIdentity = ({ data, updatePet = false }) => {
    const chunks = _chunk(data, 2);

    return (
        <React.Fragment>
            <View style={styles.headingSection}>
                <Heading size={1} text="Pet Identity" subtitle="Family since 20 June 2021" badge={{ text: "Cat" }} gapless />
                {updatePet && (
                    <View style={styles.actionBtnContainer}>
                        <Button icon="far edit" label="Update Pet" color="white" small iconRight />
                    </View>
                )}
            </View>

            {chunks.map((items, i) => (
                <View key={i} style={{ ...styles.row, marginBottom: i === chunks.length - 1 ? 0 : 15 }}>
                    {items.map((props, j) => (
                        <PetID key={j} {...props} />
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
    updatePet: PropTypes.bool,
};

export default PetIdentity;
