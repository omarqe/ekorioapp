import React, { useState, useEffect } from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Button from "../../components/button";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import PetSwitch from "../../components/pet/pet-switch";
import Container from "../../components/container";
import SurveyQuestion from "../../components/pet/survey-question";
import ProgressBarSurvey from "../../components/progressbar-survey";

import { View, StyleSheet } from "react-native";

import pets from "../../../data/pets.json";
import survey from "../../../data/survey/survey.json";

import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _clone from "lodash/clone";

export default function PetHealthSurveyScreen({ navigation, route }) {
    const [answers, setAnswers] = useState([]);
    const [sIndex, setSIndex] = useState(0); // Section Index
    const [qIndex, setQIndex] = useState(0); // Question ID
    const section = _get(survey, `[${sIndex}]`, {});
    const q = _get(section?.questions, `[${qIndex}]`);
    const qID = q?.id;
    const pet = _find(pets, { id: route?.params?.petID });
    const answer = _find(answers, { id: qID });

    useEffect(() => {
        if (_findIndex(answers, { id: qID }) < 0) {
            // When answer is not yet in the state, let's create one
            setAnswers([
                ...answers,
                {
                    id: qID, // <- questionID
                    values: [], // <- an array of optionID
                },
            ]);
        }
    }, [sIndex, qIndex]);

    // Handle what happens when toggling options
    const _onCheckOption = (optionID, checked) => {
        let clonedAnswers = _clone(answers);
        const ansIndex = _findIndex(clonedAnswers, { id: qID });
        const answer = clonedAnswers[ansIndex];
        const values = answer?.values ?? [];
        const valueIndex = values.indexOf(optionID);

        if (q?.type === 1) {
            if (valueIndex > -1 && !checked) values.splice(valueIndex, 1);
            else if (valueIndex < 0 && checked) values.push(optionID);
        } else {
            values.splice(0, values?.length);
            values.push(optionID);
        }

        clonedAnswers[ansIndex] = { ...answer, values };
        setAnswers(clonedAnswers);
    };

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
                <Body base="purple" style={styles.body} flex>
                    <View style={styles.card}>
                        <SurveyQuestion {...q} pet={pet} onPress={_onCheckOption} values={answer?.values} />
                        <View style={styles.buttonContainer}>
                            <Button
                                text="Previous"
                                icon="chevron-left"
                                style={styles.buttonPrev}
                                textStyle={styles.buttonPrevText}
                                small
                            />
                            <Button text="Next Question" icon="arrow-right" color="purple" style={styles.button} iconRight />
                        </View>
                    </View>
                </Body>
            </Layout>
            <View style={styles.footer}></View>
        </Container>
    );
}

const PADDING = 20;
const styles = StyleSheet.create({
    card: {
        padding: PADDING,
        borderRadius: PADDING,
        backgroundColor: CT.BG_WHITE,
        ...CT.SHADOW_LG,
    },
    body: {
        paddingTop: 10,
    },
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
    button: {
        padding: 12,
    },
    buttonPrev: {
        elevation: 0,
        borderWidth: 0,
        shadowOpacity: 0,
        marginRight: 5,
        backgroundColor: "transparent",
    },
    buttonPrevText: {
        top: -1,
        color: CT.BG_GRAY_500,
    },
    buttonContainer: {
        padding: PADDING - 5,
        marginTop: 15,
        alignItems: "center",
        marginBottom: -PADDING,
        marginHorizontal: -PADDING,
        backgroundColor: CT.BG_GRAY_50,
        borderBottomLeftRadius: PADDING,
        borderBottomRightRadius: PADDING,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
