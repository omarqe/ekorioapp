import React from "react";
import CT from "../const";
import PetID from "./pet-id";
import Button from "./button";
import Heading from "./heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import _chunk from "lodash/chunk";

const PetIdentity = ({ data }) => {
    const chunks = _chunk(data, 2);
    console.log("chunks", chunks);

    return (
        <React.Fragment>
            <View style={ss.headingSection}>
                <Heading text="Pet Identity" subtitle="Family since 20 June 2021" badge={{ text: "Cat" }} />
                <View style={ss.actionBtnContainer}>
                    <Button icon="far edit" label="Update Pet" color="white" small iconRight />
                </View>
            </View>

            {chunks.map((items, i) => (
                <View key={i} style={{ ...ss.row, marginBottom: i === chunks.length - 1 ? 0 : 15 }}>
                    {items.map((props, j) => (
                        <PetID key={j} {...props} />
                    ))}
                </View>
            ))}
        </React.Fragment>
    );
};

const ss = StyleSheet.create({
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
        marginBottom: 30,
        flexDirection: "row",
    },
});

PetIdentity.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

export default PetIdentity;
