import React from "react";
import CT from "../../const.js";

import Charts from "../../components/home/charts";
import Pet from "../../components/home/pet";
import Menu from "../../components/layout/menu";
import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Icon from "../../components/icon";
import Badge from "../../components/badge";
import TopBar from "../../components/topbar";
import Button from "../../components/button";
import Heading from "../../components/heading";
import Container from "../../components/container";

import { View, Text, StyleSheet } from "react-native";

import _times from "lodash/times";
import HealthDetails from "../../components/home/health-details.js";

export default function HomeScreen({ route }) {
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
                <Body rounded overlap>
                    <View style={ss.headingSection}>
                        <Heading text="Health Stats" subtitle="Last evaluated 3 weeks ago" style={{ marginRight: "auto" }} />
                        <View>
                            <Button label="Reevaluate Health" color="white" small />
                        </View>
                    </View>
                    <View style={ss.section}>
                        <Charts data={healthData?.chart} />
                    </View>
                    <View style={{ ...ss.section, marginBottom: 0 }}>
                        <HealthDetails data={healthData?.details} />
                    </View>
                </Body>

                <Body gray flex>
                    <Text>asdasdasd</Text>
                </Body>
            </Layout>

            <Menu name={route?.name} />
        </Container>
    );
}

const ss = StyleSheet.create({
    headingSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
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
});
