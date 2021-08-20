import React, { useState, useEffect } from "react";
import CT from "../../const.js";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import PetList from "../../components/pet/pet-list";
import PetIdentity from "../../components/pet/pet-identity";
import HealthCharts from "../../components/pet/health-charts";
import HealthCategories from "../../components/pet/health-categories";

import Heading from "../../components/heading";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import ButtonIcon from "../../components/button-icon";

import { View, StyleSheet } from "react-native";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

import pets from "../../../data/pets.json";
import _find from "lodash/find";
import _times from "lodash/times";
import _first from "lodash/first";

const HomeScreen = connectActionSheet(({ navigation }) => {
    const go = (key) => navigation.navigate(key);
    const [petID, setPetID] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        const first = _first(pets);
        setPetID(first?.id);
    }, []);

    const data = _find(pets, { id: petID });
    const healthData = {
        chart: [
            {
                id: "physical",
                label: "Physical",
                value: 0.25,
                delta: 0.1,
                indicator: "up",
            },
            {
                id: "nutrition",
                label: "Nutrition",
                value: 0.55,
                delta: 0.25,
                indicator: "up",
            },
            {
                id: "lifestyle",
                label: "Lifestyle",
                value: 0.8,
                delta: 0.3,
                indicator: "up",
            },
        ],
        details: [
            { id: 0, label: "Eyes", score: 9 },
            { id: 0, label: "Ears", score: 10 },
            { id: 0, label: "Teeth & Mouth", score: 6 },
            { id: 0, label: "Skin & Coat", score: 6 },
            { id: 0, label: "Fleas", score: 10 },
            { id: 0, label: "Ticks", score: 10 },
            { id: 0, label: "Heart", score: 9 },
            { id: 0, label: "Heartworms", score: 9 },
            { id: 0, label: "Breathing", score: 10 },
            { id: 0, label: "Bones & Joints", score: 7 },
            { id: 0, label: "Alertness & Balance", score: 7 },
            { id: 0, label: "Urinary Tract", score: 9 },
            { id: 0, label: "Cancer & Immune Function", score: 10 },
        ],
    };

    const petData = [
        { label: "Name", value: data?.name },
        { label: "Microchip ID", value: data?.microchipID, verified: data?.microchipVerified },
        { label: "Parent's Name", value: "Eve Harrison" },
        { label: "Colors", value: ["#3E4C59", "#9AA5B1"] },
        { label: "Breed", value: data?.breedName },
        { label: "Birthday", value: data?.birthday },
        { label: "Age (Cat Year)", value: data?.agePet },
        { label: "Age (Human Year)", value: data?.ageHuman },
        { label: "Gender", value: data?.gender },
        { label: "Weight", value: `${data?.weight} kg` },
    ];

    const _onChangePet = (id) => setPetID(id);
    const _onOptions = () => {
        const options = ["Reevaluate Health", "View Health Records", "Done"];
        const cancelButtonIndex = 2;
        showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
            const cmd = [go.bind(null, "pet__evaluate"), go.bind(null, "pet__health-records")];
            if (typeof cmd[buttonIndex] === "function") {
                cmd[buttonIndex]();
            }
        });
    };

    return (
        <Container>
            <TopBar type={2} rightIcon="plus" rightIconProps={{ onPress: go.bind(null, "pet__form") }} />

            <Layout gray withHeader>
                <Header horizontal overlap>
                    <PetList size={65} margin={4} active={petID} onPress={_onChangePet} />
                </Header>

                <Body topRounded overlap>
                    <View style={styles.headingSection}>
                        <Heading text={`${data?.name}'s Health`} subtitle="Last evaluated 3 weeks ago" gapless />
                        <View style={styles.actionBtnContainer}>
                            <ButtonIcon icon="ellipsis-h" style={{ marginRight: -10 }} onPress={_onOptions} inverted />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <HealthCharts data={healthData?.chart} />
                    </View>
                    <View style={{ ...styles.section, marginBottom: 0 }}>
                        <HealthCategories data={healthData?.details} />
                    </View>
                </Body>

                <Body gray>
                    <PetIdentity
                        data={petData}
                        button={{
                            icon: "far edit",
                            text: "Update Pet",
                            onPress: go.bind(null, "pet__form"),
                            iconRight: true,
                        }}
                    />
                </Body>
            </Layout>
        </Container>
    );
});

const styles = StyleSheet.create({
    actionBtnContainer: {
        marginLeft: "auto",
    },
    headingSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: 30,
        flexDirection: "row",
    },
    section: {
        marginBottom: 20,
    },
    detailSection: {},

    healthDetails: {
        ...CT.SHADOW_SM,
        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        borderRadius: 8,
    },
    detailItem: {
        display: "flex",
        padding: 12,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: CT.BG_WHITE,
        borderBottomWidth: 1,
        borderBottomColor: CT.BG_GRAY_50,
    },
    detailLabel: {
        color: CT.BG_GRAY_700,
        fontWeight: "700",
        marginLeft: 5,
        marginRight: "auto",
    },
    medicalHistoryBtn: {
        marginTop: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: CT.BG_PURPLE_400,
        fontSize: 16,
        fontWeight: "600",
        textDecorationLine: "underline",
    },
});

export default HomeScreen;
