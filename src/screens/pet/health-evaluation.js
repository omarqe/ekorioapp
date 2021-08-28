import React from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Button from "../../components/button";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import PetSwitch from "../../components/pet/pet-switch";
import Container from "../../components/container";
import ProgressBarSurvey from "../../components/progressbar-survey";

import pets from "../../../data/pets.json";

import { View, StyleSheet } from "react-native";

export default function PetHealthEvaluationScreen({ navigation }) {
    return (
        <Container style={{ backgroundColor: CT.BG_PURPLE_900 }}>
            <TopBar
                type={1}
                leftIcon="chevron-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightComponent={<PetSwitch pets={pets} checked={1} supressed />}
            />
            <Header contentStyle={styles.headerContent}>
                <Heading
                    size={1}
                    text="Section 1: Lifestyle"
                    kicker="Question 1 of 22"
                    style={styles.heading}
                    textStyle={styles.headingText}
                    kickerStyle={styles.headingKicker}
                />
                <ProgressBarSurvey n={1} total={22} />
            </Header>
            <Layout base="purple">
                <Body base="purple" flex></Body>
            </Layout>
            <View style={styles.footer}>
                <Button text="Next Question" icon="arrow-right" color="purple" style={styles.button} iconRight />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        flexDirection: "column",
    },
    heading: {
        width: "100%",
        marginBottom: 15,
    },
    headingText: {
        color: CT.BG_WHITE,
    },
    headingKicker: {
        color: CT.BG_PURPLE_400,
    },
    footer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "row",
        backgroundColor: CT.BG_PURPLE_900,
        paddingHorizontal: 23,
        padding: 25,
    },
    button: {
        padding: 12,
    },
});
