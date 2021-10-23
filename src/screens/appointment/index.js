import React, { useState, useEffect } from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Tabs from "../../components/tabs";
import Text from "../../components/text";
import List from "../../components/list";
import Empty from "../../components/empty";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import EmptyArt from "../../../assets/arts/ginger-cat-722.svg";

import { TabView } from "react-native-tab-view";
import { StyleSheet } from "react-native";

import net from "../../functions/net";
import http from "../../functions/http";
import moment from "moment";

import _get from "lodash/get";
import _clone from "lodash/clone";
import _toLower from "lodash/toLower";
import _renderIf from "../../functions/renderIf";
import _createSceneMap from "../../functions/createSceneMap";

const Scene = ({ data = [], loading = false, initiated = false, onPress }) => {
    if (loading || !initiated) {
        data = [];
        loading = true;
        for (let i = 1; i < 3; i++) {
            const key = i.toString();
            data = [...data, { text: key, subtitle: key, badge: { text: key } }];
        }
    }

    return (
        <Layout scrollEnabled={false} gray>
            <Body gray flex expanded>
                {_renderIf(
                    data?.length > 0,
                    <List list={data} loading={loading} onPress={onPress} bounces scrollEnabled />,
                    <Empty
                        art={EmptyArt}
                        artProps={{ style: { marginBottom: -10 } }}
                        title="Oh mom, look it's empty! 👀"
                        subtitle="Your upcoming appointments will appear here"
                    />
                )}
            </Body>
        </Layout>
    );
};

const AppointmentScreen = ({ navigation, route }) => {
    const Time = ({ date }) => {
        const d = moment(date);
        return (
            <React.Fragment>
                <Text style={styles.time}>
                    {d.format(CT.DATE_FORMAT_PRETTY)} <Text style={{ color: CT.BG_GRAY_200 }}>@</Text> {d.format("h:mm")}
                </Text>
                <Text style={{ color: CT.BG_GRAY_500, fontSize: 12, fontWeight: "600" }}>{d.format("a")}</Text>
            </React.Fragment>
        );
    };

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

    const scenes = _createSceneMap(state?.routes, Scene, _onPressItem, loading);
    const _onIndexChange = (index) => setState({ ...state, index });
    const _onPressBookingAppointment = () => navigation.navigate("appointment__booking");
    const _onPressItem = (index) => {
        const key = _get(state, `routes[${state.index}].key`);
        const id = _get(appointments, `[${key}][${index}].id`);
        navigation.navigate("appointment__details", { id });
    };
    const _renderScene = ({ route }) => {
        const key = route?.key;
        const data = appointments[key];
        const Scene = scenes[key];
        if (Scene !== undefined && Scene !== null) {
            return <Scene data={data} initiated={data !== undefined} loading={loadingData} onPress={_onPressItem} />;
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
    const _fetchAppointments = (key, id) => {
        setLoadingData(!appointments[key]);

        http.get(`/appointments/by/service/${id}`)
            .then(({ data: apmts }) => {
                setLoadingData(false);
                if (apmts?.length > 0) {
                    const items = apmts.map(({ id, date, service, pet, veterinar: vet }) => {
                        return {
                            id,
                            text: <Time date={date} />,
                            badge: { text: "Pending" },
                            subtitle: [vet?.name, vet?.city].join(", "),
                            tags: [
                                { icon: "magic", text: service?.name },
                                { icon: "cat", text: pet?.name },
                            ],
                        };
                    });
                    setAppointments({ ...appointments, [key]: items });
                    return;
                }
                setAppointments({ ...appointments, [key]: [] });
            })
            .catch(({ response }) => net.handleCatch(response, setLoadingData));
    };

    useEffect(() => {
        http.get("/appointments/services")
            .then(({ data: services }) => {
                if (services?.length > 0) {
                    const routes = services.map(({ id, name: label }, i) => {
                        const key = _toLower(label);
                        if (i === 0) {
                            _fetchAppointments(key, id);
                        }

                        return { id, key, label };
                    });
                    console.log("routes", routes);
                    setState({ index: 0, routes });
                    setLoading(false);
                }
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    }, []);

    useEffect(() => {
        const route = _get(state, `routes[${state.index}]`);
        const id = route?.id;
        const key = route?.key;
        _fetchAppointments(key, id);
    }, [state.index, route?.params?.shouldRefresh]);

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
