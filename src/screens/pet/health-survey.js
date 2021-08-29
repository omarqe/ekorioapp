import React from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Icon from "../../components/icon";
import Text from "../../components/text";
import Button from "../../components/button";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import PetSwitch from "../../components/pet/pet-switch";
import Container from "../../components/container";
import ProgressBarSurvey from "../../components/progressbar-survey";

import pets from "../../../data/pets.json";

import { View, StyleSheet } from "react-native";

export default function PetHealthSurveyScreen({ navigation }) {
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
                        <Heading
                            gapless
                            kicker="Choose all that apply"
                            text="Have you recently noticed any of the following with Cheshire?"
                            textStyle={styles.questionText}
                        />
                        <View style={styles.options}>
                            <View style={styles.option}>
                                <View style={[styles.checkbox, styles.checkboxChecked]}>
                                    <Icon icon="fas check" size={12} color={CT.BG_WHITE} />
                                </View>
                                <Text style={[styles.optionText, styles.optionTextChecked]}>
                                    Spending time outdoors unsupervised.
                                </Text>
                            </View>
                            <View style={styles.option}>
                                <View style={[styles.checkbox, styles.checkboxChecked]}>
                                    <Icon icon="fas check" size={12} color={CT.BG_WHITE} />
                                </View>
                                <Text style={[styles.optionText, styles.optionTextChecked]}>
                                    Spending time outdoors supervised or on a leash.
                                </Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Socializing with cats outside your home.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Visiting a groomer.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Boarding.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Helping people as a therapy or assistance cat.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Living with dogs.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Living with cats that go outdoors.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Living with cats that stay outdoors.</Text>
                            </View>
                            <View style={[styles.option]}>
                                <View style={[styles.checkbox]} />
                                <Text style={styles.optionText}>Other activities.</Text>
                            </View>
                        </View>

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

    questionText: {
        lineHeight: 28,
    },
    options: {
        paddingTop: 15,
    },
    option: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },
    optionText: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 16,
        fontWeight: "500",
    },
    optionTextChecked: {
        color: CT.FONT_COLOR,
    },
    checkbox: {
        width: 22,
        height: 22,
        marginRight: 10,
        borderRadius: 22,
        backgroundColor: CT.BG_GRAY_100,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: CT.CTA_POSITIVE,
    },

    body: {
        paddingTop: 10,
    },
    headerContent: {
        flexDirection: "column",
        // paddingBottom: 10,
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
        right: 25,
        bottom: 25,
        position: "absolute",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "row",
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
