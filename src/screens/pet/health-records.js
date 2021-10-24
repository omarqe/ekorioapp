import React, { useState, useEffect } from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Tabs from "../../components/tabs";
import List from "../../components/list";
import Empty from "../../components/empty";
import TopBar from "../../components/topbar";
import PetSwitch from "../../components/pet/pet-switch";
import Container from "../../components/container";
import EmptyArt from "../../../assets/arts/ginger-cat-722.svg";
import AppointmentScene from "../../components/appointmnet/appointment-scene";

import { TabView } from "react-native-tab-view";
import { StyleSheet } from "react-native";

import status from "../../functions/status";
import _get from "lodash/get";
import _first from "lodash/first";
import _renderIf from "../../functions/renderIf";
import _createSceneMap from "../../functions/createSceneMap";
import _fetchServiceTypes from "../../functions/fetchServiceTypes";
import _fetchAppointments from "../../functions/fetchAppointments";

const PetHealthRecordsScreen = ({ navigation, route }) => {
    const [records, setRecords] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [petID, setPetID] = useState(null);
    const [state, setState] = useState({
        index: 0,
        routes: [
            { key: "grooming", label: "Grooming" },
            { key: "boarding", label: "Boarding" },
            { key: "surgery", label: "Surgery" },
            { key: "general", label: "General" },
        ],
    });

    const pets = [];
    const scenes = _createSceneMap(state?.routes, AppointmentScene);
    const excludes = ["pending", "confirmed", "active"].map((key) => status.id(key));
    const _onIndexChange = (index) => setState({ ...state, index });
    const _onSwitchPet = (id) => setPetID(id);
    const _onPressItem = (index) => {
        const key = _get(state, `routes[${state.index}].key`);
        const id = _get(records, `[${key}][${index}].id`);
        navigation.navigate("pet__health-details", { id });
    };
    const _renderScene = ({ route }) => {
        const key = route?.key;
        const Scene = scenes[key];
        if (Scene !== undefined && Scene !== null) {
            return (
                <Scene data={records[key]} initiated={records !== undefined} loading={loadingData} onPress={_onPressItem} />
            );
        }
    };
    const _renderTabBar = ({ navigationState: state }) => (
        <Header style={styles.header}>
            <Tabs
                tabs={state?.routes}
                active={state?.index}
                onPress={_onIndexChange}
                loading={loading}
                alwaysBounceHorizontal={false}
            />
        </Header>
    );

    // Initialisation
    useEffect(() => {
        const petId = route?.params?.petID;
        setPetID(petId);
        _fetchServiceTypes(setState, setLoading, setRecords, setLoadingData, { petId, excludes });
    }, []);

    useEffect(() => {
        const route = _get(state, `routes[${state.index}]`);
        const petId = petID;
        const serviceId = route?.id;
        _fetchAppointments(route?.key, records, setRecords, setLoadingData, { serviceId, petId, excludes });
    }, [state?.index, petID]);

    return (
        <Container>
            <TopBar
                type={1}
                title="Health Records"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightComponent={<PetSwitch pets={pets} checked={petID} onSwitch={_onSwitchPet} />}
            />
            <TabView
                renderScene={_renderScene}
                renderTabBar={_renderTabBar}
                onIndexChange={_onIndexChange}
                navigationState={state}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: 0,
    },
    petListContainer: {
        display: "flex",
        flexDirection: "row",
    },
});

export default PetHealthRecordsScreen;
