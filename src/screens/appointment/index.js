import React, { useState, useEffect } from "react";

import Header from "../../components/layout/header";
import Tabs from "../../components/tabs";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import AppointmentScene from "../../components/appointmnet/appointment-scene";

import { TabView } from "react-native-tab-view";
import { StyleSheet } from "react-native";

import status from "../../functions/status";
import _get from "lodash/get";
import _clone from "lodash/clone";
import _toLower from "lodash/toLower";
import _renderIf from "../../functions/renderIf";
import _findIndex from "lodash/findIndex";
import _createSceneMap from "../../functions/createSceneMap";
import _fetchServiceTypes from "../../functions/fetchServiceTypes";
import _fetchAppointments from "../../functions/fetchAppointments";

const AppointmentScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [appointments, setAppointments] = useState({});
    const [state, setState] = useState({
        index: 0,
        routes: [
            { id: 1, key: "grooming", label: "Grooming" },
            { id: 2, key: "boarding", label: "Boarding" },
            { id: 3, key: "surgery", label: "Surgery" },
            { id: 4, key: "general", label: "General" },
        ],
    });

    const scenes = _createSceneMap(state?.routes, AppointmentScene);
    const _onIndexChange = (index) => setState({ ...state, index });
    const _onPressBookingAppointment = () => navigation.navigate("appointment__booking");
    const _onPressItem = (index) => {
        const key = _get(state, `routes[${state.index}].key`);
        const id = _get(appointments, `[${key}][${index}].id`);
        navigation.navigate("appointment__details", { id });
    };
    const _renderScene = ({ route }) => {
        const key = route?.key;
        const Scene = scenes[key];
        if (Scene !== undefined && Scene !== null) {
            return (
                <Scene
                    data={appointments[key]}
                    loading={loadingData}
                    onPress={_onPressItem}
                    initiated={appointments[key] !== undefined}
                />
            );
        }
        return null;
    };
    const _renderTabBar = ({ navigationState: state }) => (
        <Header style={styles.header}>
            <Tabs
                loading={loading}
                tabs={state?.routes}
                active={state?.index}
                onPress={_onIndexChange}
                alwaysBounceHorizontal={false}
            />
        </Header>
    );

    // Initialization
    const excludes = [status.id("completed")];
    useEffect(() => _fetchServiceTypes(setState, setLoading, setAppointments, setLoadingData, { excludes }), []);
    useEffect(() => {
        const route = _get(state, `routes[${state.index}]`);
        const key = route?.key;
        const serviceId = route?.id;
        _fetchAppointments(key, appointments, setAppointments, setLoadingData, { serviceId, excludes });
    }, [state.index]);
    useEffect(() => {
        const serviceId = _get(route, "params.serviceID", null);
        const index = _findIndex(state.routes, (o) => o.id == serviceId);
        if (state.index !== index) {
            setState({ ...state, index });
        }
    }, [route?.params?.shouldRefresh]);

    return (
        <Container>
            <TopBar
                type={1}
                title="Appointments"
                rightIcon="plus"
                rightIconProps={{ glow: true, onPress: _onPressBookingAppointment }}
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
    time: {
        fontSize: 13,
    },
    header: {
        paddingBottom: 0,
    },
});

export default AppointmentScreen;
