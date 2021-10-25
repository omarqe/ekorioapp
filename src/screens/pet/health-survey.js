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
import * as Haptics from "expo-haptics";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";

import _flatten from "lodash/flatten";
import _clone from "lodash/clone";
import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _upperFirst from "lodash/upperFirst";

export default function PetHealthSurveyScreen({ navigation, route }) {
    const pet = _get(route, "params.pet", null);
    const petID = _get(pet, "id", null);
    const survey = _get(route, "params.survey");
    const recordID = _get(route, "params.recordID", null);
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Flatten all questions and calculate total and current question's number
    const questions = _flatten(survey.map(({ questions }) => questions));
    const questionTh = qIndex + 1;
    const total = questions?.length;

    // Get question data
    const q = _get(questions, `[${qIndex}]`);
    const qID = q?.id;
    const required = q?.required;
    const answer = _find(answers, { id: qID });
    const disabled = required && answer?.values?.length < 1;

    // Get section data based on question ID
    const section = _find(survey, (o) => _findIndex(o?.questions, { id: qID }) > -1);
    const sectionTh = _findIndex(survey, { name: section?.name }) + 1;
    const isFinal = qIndex === questions?.length - 1;
    const sectionIndicator = `Section ${sectionTh}`;

    // Send haptics feedback to the user
    const sendHaptics = (style = Haptics.ImpactFeedbackStyle.Light) => Haptics.impactAsync(style);

    // Handle what happens when pressing next
    const _onNext = () => {
        sendHaptics(Haptics.ImpactFeedbackStyle.Medium);
        const options = { arrayFormat: "brackets" };
        const postdata = { id: recordID, questionId: qID, factors: answer?.values };
        http.post("/survey/records/answer", net.data(postdata, options))
            .then(({ data }) => {
                if (data?.success) {
                    if (isFinal) {
                        http.put("/survey/records/finish", net.data({ id: recordID }))
                            .then(({ data }) => {
                                if (data?.success) {
                                    navigation.navigate("home", { shouldRefresh: Date.now() });
                                }
                            })
                            .catch(({ response }) => net.handleCatch(response));
                        return;
                    }
                    qIndex < total - 1 ? setQIndex(qIndex + 1) : null;
                }
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    };
    const _onPrev = () => {
        sendHaptics(Haptics.ImpactFeedbackStyle.Medium);
        if (qIndex > 0) {
            setLoading(true);
            const newIndex = qIndex - 1;
            const questionId = _get(questions, `[${newIndex}].id`);
            http.post("/survey/records/answer/undo", net.data({ id: recordID, questionId }))
                .then(({ data }) => {
                    setLoading(false);
                    if (data?.success) {
                        setQIndex(newIndex);
                    }
                })
                .catch(({ response }) => net.handleCatch(response, setLoading));
        }
    };
    const _onCheckOption = (optionID, checked) => {
        sendHaptics();
        // Handle what happens when toggling options
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

    useEffect(() => {
        if (petID === null || recordID === null) {
            toast.show("Survey record is not created, please try again");
            navigation.goBack();
        }
    }, []);

    useEffect(() => {
        // When answer is not yet in the state, let's create one
        if (_findIndex(answers, { id: qID }) < 0) {
            setAnswers([...answers, { id: qID, values: [] }]);
        }
    }, [qIndex]);

    return (
        <Container style={{ backgroundColor: CT.BG_PURPLE_900 }}>
            <TopBar
                type={1}
                leftIcon="chevron-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightComponent={<PetSwitch pets={[pet]} checked={petID} supressed />}
            />
            <Header contentStyle={styles.headerContent}>
                <Heading
                    size={1}
                    text={`${sectionIndicator}: ${_upperFirst(section?.name)}`}
                    kicker={`Question ${questionTh} of ${total}`}
                    style={styles.heading}
                    textStyle={styles.headingText}
                    kickerStyle={styles.headingKicker}
                />
                <ProgressBarSurvey n={questionTh} total={total} />
            </Header>
            <Layout base="purple">
                <Body base="purple" style={styles.body} flex>
                    <View style={styles.card}>
                        <SurveyQuestion {...q} pet={pet} onPress={_onCheckOption} values={answer?.values} />
                        <View style={styles.buttonContainer}>
                            {qIndex > 0 && !loading && (
                                <Button
                                    small
                                    loading={loading}
                                    text="Previous"
                                    icon="chevron-left"
                                    style={styles.buttonPrev}
                                    onPress={_onPrev}
                                    textStyle={styles.buttonPrevText}
                                />
                            )}
                            <Button
                                small
                                iconRight
                                text={isFinal ? "Get Reports" : "Next Question"}
                                icon="arrow-right"
                                color="purple"
                                style={styles.button}
                                onPress={_onNext}
                                disabled={disabled || loading}
                            />
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
