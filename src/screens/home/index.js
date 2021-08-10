import React from "react";
import CT from "../../const.js";

import HealthDetails from "../../components/home/health-details.js";
import Charts from "../../components/home/charts";
import Pet from "../../components/home/pet";
import Menu from "../../components/layout/menu";
import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Heading from "../../components/heading";
import TopBar from "../../components/topbar";
import PetID from "../../components/pet-id";
import Button from "../../components/button";
import ButtonIcon from "../../components/button-icon";
import Container from "../../components/container";

import { View, StyleSheet } from "react-native";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

import _times from "lodash/times";

const Home = ({ route }) => {
    const { showActionSheetWithOptions } = useActionSheet();
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
            { id: 0, label: "Hearworms", score: 9 },
            { id: 0, label: "Breathing", score: 10 },
            { id: 0, label: "Bones & Joints", score: 7 },
            { id: 0, label: "Alertness & Balance", score: 7 },
            { id: 0, label: "Urinary Tract", score: 9 },
            { id: 0, label: "Cancer & Immune Function", score: 10 },
        ],
    };

    const onMoreOptions = () => {
        const options = ["Reevaluate Health", "View Medical History", "Done"];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    alert("Reevaluate health!");
                    break;
                case 1:
                    alert("Viewing medical history");
                    break;
            }
        });
    };

    return (
        <Container>
            <TopBar
                type={2}
                leftIcon="arrow-left"
                rightIcon="bell"
                rightIconProps={{ onPress: () => alert("Opening notifications..") }}
                logoProps={{ onPress: () => alert("Moving up!") }}
            />

            <Layout gray withHeader>
                <Header horizontal>
                    <Pet active />
                    <Pet add />
                </Header>

                <Body topRounded overlap>
                    <View style={ss.headingSection}>
                        <Heading size={1} text="Health Stats" subtitle="Last evaluated 3 weeks ago" />
                        <View style={ss.actionBtnContainer}>
                            <ButtonIcon icon="ellipsis-h" style={{ marginRight: -10 }} onPress={onMoreOptions} inverted />
                        </View>
                    </View>
                    <View style={ss.section}>
                        <Charts data={healthData?.chart} />
                    </View>
                    <View style={{ ...ss.section, marginBottom: 0 }}>
                        <HealthDetails data={healthData?.details} />
                    </View>
                </Body>

                <Body gray>
                    <View style={ss.headingSection}>
                        <Heading size={1} text="Pet Identity" subtitle="Family since 20 June 2021" badge={{ text: "Cat" }} />
                        <View style={ss.actionBtnContainer}>
                            <Button icon="far edit" label="Update Pet" color="white" small iconRight />
                        </View>
                    </View>

                    <View style={ss.row}>
                        <PetID label="Name" value="Cheshire" />
                        <PetID label="Microchip ID" value="0028031030021" verified />
                    </View>
                    <View style={ss.row}>
                        <PetID label="Parent's Name" value="Eve Harrison" />
                        <PetID label="Colors" value={["#3E4C59", "#9AA5B1"]} />
                    </View>
                    <View style={ss.row}>
                        <PetID label="Breed" value="British Shorthair" />
                        <PetID label="Birthday" value="Jan 1, 2021" />
                    </View>
                    <View style={ss.row}>
                        <PetID label="Age (Cat Year)" value="7 months" />
                        <PetID label="Age (Human Year)" value="11 years" />
                    </View>
                    <View style={{ ...ss.row, marginBottom: 0 }}>
                        <PetID label="Gender" value="Male" />
                        <PetID label="Weight" value="2.50 kg" />
                    </View>
                </Body>
            </Layout>

            <Menu name={route?.name} />
        </Container>
    );
};

const ss = StyleSheet.create({
    row: {
        display: "flex",
        marginBottom: 15,
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

const HomeScreen = connectActionSheet(Home);
export default HomeScreen;
