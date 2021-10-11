import React, { useState, useEffect } from "react";
import CT from "../../const.js";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Modal from "../../components/modal";
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

import _find from "lodash/find";
import _times from "lodash/times";
import _first from "lodash/first";
import _capitalize from "lodash/capitalize";

import pets from "../../../data/pets.json";
import health from "../../../data/health.json";
import petTypes from "../../../data/pet-types.json";

const HomeScreen = connectActionSheet(({ navigation }) => {
    const go = (key, options = {}) => navigation.navigate(key, options);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPet, setLoadingPet] = useState(true);
    const [loadingSurvey, setLoadingSurvey] = useState(false);

    const [healthData, setHealthData] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        const data = _first(pets);
        const id = data?.id;
        const healthData = _find(health, { id });

        const t = setTimeout(() => {
            setLoadingPet(false);
            clearTimeout(t);
        }, CT.WAITING_DEMO);
        const t2 = setTimeout(() => {
            setLoading(false);
            clearTimeout(t2);
        }, CT.WAITING_DEMO + 200);

        setData(data);
        setHealthData(healthData);
    }, []);

    const healthChartTitle = loading ? "Health Report" : `${data?.name}'s Health`;
    const healthChartSubtitle = loading ? "Loading.." : "Last evaluated 3 weeks ago";
    const healthChartsData = healthData?.chart;
    const healthCategoriesData = _find(healthData?.categories, { current: true })?.data;
    const displayData = [
        { label: "Name", value: data?.name },
        { label: "Microchip ID", value: data?.microchipID, verified: data?.microchipVerified },
        { label: "Parent's Name", value: "Eve Harrison" },
        { label: "Colors", value: ["#3E4C59", "#9AA5B1"] },
        { label: "Breed", value: _find(_find(petTypes, { id: data?.type })?.breeds, { value: data?.breedID })?.label },
        { label: "Birthday", value: data?.birthday },
        { label: "Age (Cat Year)", value: data?.agePet },
        { label: "Age (Human Year)", value: data?.ageHuman },
        { label: "Gender", value: _capitalize(data?.gender) },
        { label: "Weight", value: `${data?.weight} kg` },
    ];

    const _onStartSurvey = () => {
        setLoadingSurvey(true);
        const t = setTimeout(() => {
            go("pet__health-survey", { petID: data?.id });
            setLoadingSurvey(false);
            clearTimeout(t);
        }, CT.WAITING_DEMO / 3);
    };
    const _onChangePet = (id) => {
        if (loading) {
            return;
        }

        setData(_find(pets, { id }));
        setLoading(true);
        setHealthData(_find(health, { id }));
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
                go.bind(null, "pet__form", data),
                _onStartSurvey,
                go.bind(null, "pet__health-records", { petID: data?.id }),
            ];
            if (typeof cmd[buttonIndex] === "function") {
                cmd[buttonIndex]();
            }
        });
    };

    let updateBtn = null;
    if (!loading) {
        updateBtn = {
            icon: "far edit",
            text: "Update Pet",
            onPress: go.bind(null, "pet__form", data),
            disabled: loadingPet,
            iconRight: true,
        };
    }

    return (
        <Container loading={loadingSurvey}>
            <TopBar type={2} rightIcon="plus" rightIconProps={{ onPress: go.bind(null, "pet__form", null) }} />

            <Layout gray withHeader>
                <Header horizontal overlap>
                    <PetList size={65} margin={4} active={data?.id} loading={loadingPet} onPress={_onChangePet} />
                </Header>

                <Body topRounded overlap>
                    <View style={styles.headingSection}>
                        <Heading size={0} text={healthChartTitle} subtitle={healthChartSubtitle} gapless />
                        <View style={styles.actionBtnContainer}>
                            <ButtonIcon icon="ellipsis-h" style={{ marginRight: -10 }} onPress={_onOptions} inverted />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <HealthCharts data={healthChartsData} loading={loading} />
                    </View>
                    <View style={{ ...styles.section, marginBottom: 0 }}>
                        <HealthCategories data={healthCategoriesData} loading={loading} />
                    </View>
                </Body>

                <Body gray>
                    <PetIdentity data={displayData} button={updateBtn} loading={loadingPet} />
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
