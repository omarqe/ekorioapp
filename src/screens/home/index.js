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
import EmptyPetArt from "../../../assets/arts/ginger-cat-79.svg";

import { View, StyleSheet } from "react-native";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

import net from "../../functions/net";
import http from "../../functions/http";
import moment from "moment";
import * as Haptics from "expo-haptics";

import _renderIf from "../../functions/renderIf";
import _env from "../../functions/env";
import _find from "lodash/find";
import _times from "lodash/times";
import _first from "lodash/first";
import _clone from "lodash/clone";
import _sortBy from "lodash/sortBy";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";
import _capitalize from "lodash/capitalize";

const HomeScreen = connectActionSheet(({ navigation, route }) => {
    const go = (key, options = {}) => navigation.navigate(key, options);
    const [loading, setLoading] = useState(true);
    const [loadingPet, setLoadingPet] = useState(true);
    const [loadingSurvey, setLoadingSurvey] = useState(false);

    const [pets, setPets] = useState([]);
    const [petID, setPetID] = useState(null);
    const [healthData, setHealthData] = useState({});
    const { showActionSheetWithOptions } = useActionSheet();

    // Update the newly updated/created pet
    const pet = _find(pets, { id: petID });
    const recentPet = route?.params?.recentPet;

    const emptyPets = pets?.length < 1 && !loadingPet;
    const hasHealthData = !_isEmpty(healthData) && !_isEmpty(healthData?.charts) && !_isEmpty(healthData?.categories);

    const reportDate = moment(healthData?.date);
    const healthChartTitle = loadingPet ? "Health Report" : `${pet?.name}'s Health`;
    let healthChartSubtitle = hasHealthData ? `Last evaluated ${reportDate.fromNow()}` : "Not available";
    if (loading) {
        healthChartSubtitle = "Loading..";
    }

    const healthChartsData = healthData?.charts;
    const healthCategories = healthData?.categories;
    const placeholderChart = { date: null, charts: [], categories: [] };

    // Fetch health data from our server
    const getHealthData = (petID) => {
        setLoading(true);
        http.get(`/reports/pet/${petID}`)
            .then(({ data }) => {
                setLoading(false);
                const payload = data?.payload;
                const reports = { date: payload?.createdAt, charts: payload?.charts, categories: payload?.categories };
                if (!_isEmpty(reports) && !_isEmpty(reports?.charts) && !_isEmpty(reports?.categories)) {
                    setHealthData(reports);
                    return;
                }
                setHealthData(placeholderChart);
            })
            .catch(() => {
                setLoading(false);
                setHealthData(placeholderChart);
            });
    };
    const _onStartSurvey = () => {
        setLoadingSurvey(true);
        Promise.all([http.post("/survey/records/create", net.data({ petId: petID })), http.get("/survey/sections")])
            .then(([{ data: record }, { data: survey }]) => {
                setLoadingSurvey(false);
                const recordID = record?.payload?.id;
                if (record?.success && recordID !== "" && survey?.length > 0) {
                    go("pet__health-survey", { pet, survey, recordID });
                }
            })
            .catch(([{ response }, { response: resposneSurvey }]) => {
                net.handleCatch(response);
                net.handleCatch(resposneSurvey);
                setLoadingSurvey(false);
            });
    };
    const _onChangePet = (id) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (loading || id === healthData?.id) {
            return;
        }
        setPetID(id);
        getHealthData(id);
    };
    const _onOptions = () => {
        const options = ["Update Pet", `${hasHealthData ? "Reevaluate" : "Evaluate"} Health`, "View Health Records", "Done"];
        const cancelButtonIndex = 3;
        showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
            const cmd = [
                go.bind(null, "pet__form", pet),
                _onStartSurvey,
                go.bind(null, "pet__health-records", { petID: pet?.id }),
            ];
            if (typeof cmd[buttonIndex] === "function") {
                cmd[buttonIndex]();
            }
        });
    };

    // Initialize home screen
    useEffect(() => {
        const params = { self: true };
        http.get("/pets", { params })
            .then(({ data }) => {
                const { payload: pets = [] } = data;

                setLoadingPet(false);
                if (pets?.length > 0) {
                    const petID = _first(_sortBy(pets, "name"))?.id;
                    setPets(pets);
                    setPetID(petID);
                    getHealthData(petID);
                }
            })
            .catch(({ response }) => net.handleCatch(response, setLoadingPet));
    }, []);

    // After answering survey, refresh health data
    useEffect(() => getHealthData(petID), [route?.params?.shouldRefresh]);

    // After adding/updating a pet, add/refresh their data
    useEffect(() => {
        const id = recentPet?.id;
        const index = _findIndex(pets, { id });

        if (id !== null && id !== undefined) {
            setLoadingPet(true);
            http.get(`/pets/${id}`)
                .then(({ data }) => {
                    let newPetsData = _clone(pets);
                    if (index > -1) newPetsData[index] = data;
                    else newPetsData = [...newPetsData, data];
                    setPets(newPetsData);
                    setPetID(id);
                    setHealthData({});
                    setLoadingPet(false);
                })
                .catch(() => setLoadingPet(false));
        }
    }, [recentPet]);

    return (
        <Container loading={loadingSurvey}>
            <TopBar type={2} rightIcon="plus" rightIconProps={{ onPress: go.bind(null, "pet__form", null) }} />

            <Layout gray withHeader>
                {!emptyPets && (
                    <Header horizontal overlap>
                        <PetList
                            data={pets}
                            size={65}
                            margin={4}
                            active={pet?.id}
                            loading={loadingPet}
                            onPress={_onChangePet}
                            onAddPet={go.bind(null, "pet__form", null)}
                        />
                    </Header>
                )}

                {_renderIf(
                    emptyPets,
                    <Body gray flex topRounded>
                        <Empty
                            art={EmptyPetArt}
                            artProps={{ height: 130 }}
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
                                    name={pet?.name}
                                    data={healthChartsData}
                                    loading={loading}
                                    onStartSurvey={_onStartSurvey}
                                />
                            </View>
                            <View style={{ ...styles.section, marginBottom: 0 }}>
                                <HealthCategories data={healthCategories} loading={loading} />
                            </View>
                        </Body>
                        <Body gray>
                            <PetIdentity
                                data={pet}
                                loading={loadingPet}
                                button={{
                                    icon: "far edit",
                                    text: "Update Pet",
                                    loading: loadingPet,
                                    onPress: go.bind(null, "pet__form", { id: petID }),
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
