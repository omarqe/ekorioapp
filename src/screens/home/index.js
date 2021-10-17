import React, { useState, useEffect } from "react";
import CT from "../../const.js";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import PetList from "../../components/pet/pet-list";
import PetIdentity from "../../components/pet/pet-identity";
import HealthCharts from "../../components/pet/health-charts";
import HealthCategories from "../../components/pet/health-categories";

import Empty from "../../components/empty";
import Heading from "../../components/heading";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import ButtonIcon from "../../components/button-icon";

import { View, StyleSheet } from "react-native";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

import _renderIf from "../../functions/renderIf";
import _env from "../../functions/env";
import _find from "lodash/find";
import _times from "lodash/times";
import _first from "lodash/first";
import _isEmpty from "lodash/isEmpty";
import _capitalize from "lodash/capitalize";

import pets from "../../../data/pets.json";
import health from "../../../data/health.json";
import petTypes from "../../../data/pet-types.json";
import http from "../../functions/http.js";

const HomeScreen = connectActionSheet(({ navigation }) => {
    const go = (key, options = {}) => navigation.navigate(key, options);
    const [loading, setLoading] = useState(true);
    const [loadingPet, setLoadingPet] = useState(true);
    const [loadingSurvey, setLoadingSurvey] = useState(false);

    const [petData, setPetData] = useState(null);
    const [healthData, setHealthData] = useState(null);

    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        const petData = _first(pets);
        const healthData = _find(health, { id: petData?.id });

        const t = setTimeout(() => {
            setLoadingPet(false);
            clearTimeout(t);
        }, CT.WAITING_DEMO);

        const t2 = setTimeout(() => {
            setLoading(false);
            clearTimeout(t2);
        }, CT.WAITING_DEMO + 300);

        setPetData(petData);
        setHealthDataWithCaution(healthData);
    }, []);

    const emptyPets = pets?.length < 1 && !loadingPet;
    const hasHealthData = !_isEmpty(healthData) && !_isEmpty(healthData?.charts) && !_isEmpty(healthData?.categories);

    const healthChartTitle = loadingPet ? "Health Report" : `${petData?.name}'s Health`;
    const healthChartSubtitle = loading ? "Loading.." : hasHealthData ? "Last evaluated 3 weeks ago" : "Not available";
    const healthChartsData = healthData?.charts;
    const healthCategoriesData = _find(healthData?.categories, { current: true })?.data;
    const displayData = [
        { label: "Name", value: petData?.name },
        { label: "Microchip ID", value: petData?.microchipID, verified: petData?.microchipVerified },
        { label: "Parent's Name", value: "Eve Harrison" },
        { label: "Colors", value: ["#3E4C59", "#9AA5B1"] },
        { label: "Breed", value: _find(_find(petTypes, { id: petData?.type })?.breeds, { value: petData?.breedID })?.label },
        { label: "Birthday", value: petData?.birthday },
        { label: "Age (Cat Year)", value: petData?.agePet },
        { label: "Age (Human Year)", value: petData?.ageHuman },
        { label: "Gender", value: _capitalize(petData?.gender) },
        { label: "Weight", value: `${petData?.weight} kg` },
    ];

    const setHealthDataWithCaution = (data = {}) => {
        if (!_isEmpty(data) && !_isEmpty(data?.charts) && !_isEmpty(data?.categories)) {
            setHealthData(data);
            return;
        }
        setHealthData({ charts: [], categories: [] });
    };

    const _onStartSurvey = () => {
        setLoadingSurvey(true);
        const t = setTimeout(() => {
            go("pet__health-survey", { petID: petData?.id });
            setLoadingSurvey(false);
            clearTimeout(t);
        }, CT.WAITING_DEMO / 3);
    };
    const _onChangePet = (id) => {
        if (loading || id === healthData?.id) {
            return;
        }

        setLoading(true);
        setPetData(_find(pets, { id }));
        setHealthDataWithCaution(_find(health, { id }) || null);
        const t = setTimeout(() => {
            setLoading(false);
            clearTimeout(t);
        }, CT.WAITING_DEMO);
    };
    const _onOptions = () => {
        const options = ["Update Pet", "Reevaluate Health", "View Health Records", "Done"];
        const cancelButtonIndex = 3;
        showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
            const cmd = [
                go.bind(null, "pet__form", petData),
                _onStartSurvey,
                go.bind(null, "pet__health-records", { petID: petData?.id }),
            ];
            if (typeof cmd[buttonIndex] === "function") {
                cmd[buttonIndex]();
            }
        });
    };

    return (
        <Container loading={loadingSurvey}>
            <TopBar type={2} rightIcon="plus" rightIconProps={{ onPress: go.bind(null, "pet__form", null) }} />

            <Layout gray withHeader>
                {!emptyPets && (
                    <Header horizontal overlap>
                        <PetList size={65} margin={4} active={petData?.id} loading={loadingPet} onPress={_onChangePet} />
                    </Header>
                )}

                {_renderIf(
                    emptyPets,
                    <Body gray flex topRounded>
                        <Empty
                            title="Wow.. it's so quiet over here 😿"
                            button={{ text: "Add Pet", onPress: go.bind(null, "pet__form", null) }}
                            subtitle="Apparently, you do not own any pet yet."
                        />
                    </Body>,
                    <React.Fragment>
                        <Body topRounded overlap>
                            <View style={styles.headingSection}>
                                <Heading size={0} text={healthChartTitle} subtitle={healthChartSubtitle} gapless />
                                <View style={styles.actionBtnContainer}>
                                    <ButtonIcon icon="ellipsis-h" style={{ marginRight: -10 }} onPress={_onOptions} inverted />
                                </View>
                            </View>
                            <View style={styles.section}>
                                <HealthCharts
                                    name={petData?.name}
                                    data={healthChartsData}
                                    loading={loading}
                                    onStartSurvey={_onStartSurvey}
                                />
                            </View>
                            <View style={{ ...styles.section, marginBottom: 0 }}>
                                <HealthCategories data={healthCategoriesData} loading={loading} />
                            </View>
                        </Body>
                        <Body gray>
                            <PetIdentity
                                loading={loadingPet}
                                data={displayData}
                                button={{
                                    icon: "far edit",
                                    text: "Update Pet",
                                    loading: loadingPet,
                                    onPress: go.bind(null, "pet__form", petData),
                                    iconRight: true,
                                }}
                            />
                        </Body>
                    </React.Fragment>
                )}
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

    emptyLayout: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
