import React from "react";
import CT from "../../const";
import Empty from "../empty";
import PetID from "../pet-id";
import Button from "../button";
import Heading from "../heading";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import moment from "moment";
import _get from "lodash/get";
import _chunk from "lodash/chunk";
import _isEmpty from "lodash/isEmpty";
import _capitalize from "lodash/capitalize";

const PetIdentity = ({ data = {}, button = null, loading = false }) => {
    if (_isEmpty(data) && !loading) {
        return (
            <React.Fragment>
                <View style={[styles.headingSection]}>
                    <Heading text="Pet Identity" subtitle={subtitle} badge={badge} gapless />
                    {button && (
                        <View style={styles.actionBtnContainer}>
                            <Button small {...button} disabled />
                        </View>
                    )}
                </View>

                <Empty style={{ paddingTop: 20 }} title="No data to show" subtitle="There's no data to show here" />
            </React.Fragment>
        );
    }

    const getPetYear = (v) => moment(v).fromNow()?.replace(" ago", "");
    const getHumanYear = (v) => {
        const duration = moment.duration(moment().startOf("day") - moment(v));
        const months = Math.round(duration.asMonths());

        const monthsInYears = (years) => years * 12;
        const twoYearsMonths = monthsInYears(3);
        const threeYearsMonths = monthsInYears(3);
        const elevenYearsMonths = monthsInYears(11);

        let age = months;
        if (months >= elevenYearsMonths) age = 60 + (months - elevenYearsMonths) * 4;
        else if (months >= threeYearsMonths) age = 28 + (months - threeYearsMonths);
        else if (months >= twoYearsMonths) age = 28;
        else if (months >= 18) age = 21;
        else if (months >= 12) age = 15;
        else if (months >= 6) age = 10;
        else if (months >= 3) age = 4;
        else if (months >= 1) age = 1;

        return `${age} ${age > 1 ? "years" : "year"}`;
    };

    let fields = [];
    if (!loading) {
        fields = [
            { label: "Name", path: "name" },
            { label: "Microchip ID", path: "microchipId", verifiedKey: "microchipVerified" },
            { label: "Parent's Name", path: "owner.name" },
            { label: "Breed", path: "breed.name" },
            { label: "Gender", path: "gender", special: (v) => _capitalize(v) },
            { label: "Birthday", path: "birthday", special: (v) => moment(v).format("MMMM D, YYYY") },
            { label: "Age", path: "birthday", special: getPetYear },
            { label: "Age (in human years)", path: "birthday", special: getHumanYear },
            { label: "Weight", path: "weight", special: (v) => `${v} kg` },
        ];
        fields.map(({ path, special, value = null, verifiedKey = null }, i) => {
            let verified = false;
            if (value === null) value = _get(data, path, "");
            if (typeof special === "function") value = special(value);
            if (verifiedKey !== null) verified = _get(data, verifiedKey, false);

            fields[i].value = value;
            fields[i].verified = verified;
        });
    } else {
        for (let i = 0; i < 4; i++) {
            fields = [...fields, { label: "", value: "" }];
        }
    }

    // Split into chunks of two, which provides us with two-column layout
    const chunks = _chunk(fields, 2);
    const badge = loading ? null : { text: _get(data, "species.name", "N/A") };
    const subtitle = loading ? "Loading.." : `Family since ${moment(data?.createdAt).fromNow()}`;

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
    data: PropTypes.object,
    button: PropTypes.object,
    loading: PropTypes.bool,
};

export default PetIdentity;
