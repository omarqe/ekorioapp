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

import { StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import net from "../../functions/net";
import http from "../../functions/http";
import moment from "moment";
import _get from "lodash/get";
import _clone from "lodash/clone";
import _renderIf from "../../functions/renderIf";
import _createSceneMap from "../../functions/createSceneMap";

const Scene = ({ data = [], loading = false, onPress }) => {
    if (loading) {
        data = [];
        for (let i = 1; i < 3; i++) {
            data = [...data, { text: i.toString(), subtitle: null }];
        }
    }

    return (
        <Layout scrollEnabled={false} gray>
            <Body gray flex expanded>
                {_renderIf(
                    data?.length > 0,
                    <List list={data} loading={loading} onPress={onPress} padded bounces scrollEnabled />,
                    <Empty title="Oh mom, look it's empty! 👀" subtitle="Your upcoming appointments will appear here" />
                )}
            </Body>
        </Layout>
    );
};

const AppointmentScreen = ({ navigation }) => {
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

    const [state, setState] = useState({ index: 0, routes: [] });
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        http.get("/appointments/services")
            .then(({ data: services }) => {
                if (services?.length > 0) {
                    const routes = services.map(({ id, name: label }, i) => {
                        return { id, key: `${label}_${id}`, label, data: [] };
                    });
                    setState({ index: 0, routes });
                    setLoading(false);
                }
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    }, []);

    useEffect(() => {
        const index = state.index;
        const routeData = _get(state?.routes, `[${index}]`, {});
        const serviceID = routeData?.id || null;

        if (serviceID !== null) {
            http.get(`/appointments/from/service/${serviceID}`)
                .then(({ data }) => {
                    if (data?.length > 0) {
                        let routes = _clone(state?.routes);
                        let item = data.map(({ date, service, pet, veterinar: vet }) => {
                            return {
                                text: <Time date={date} />,
                                subtitle: [vet?.name, vet?.city].join(", "),
                                badge: { text: "Pending" },
                                tags: [
                                    { icon: "magic", text: service?.name },
                                    { icon: "cat", text: pet?.name },
                                ],
                            };
                        });
                        routes[index].data = item;
                        setState({ index, routes });
                    }
                })
                .catch(({ response }) => net.handleCatch(response, setLoadingData));
        }
    }, [state?.index, _get(state, "routes[0].id")]);

    const _onIndexChange = (index) => setState({ ...state, index });
    const _onPressItem = (index) => navigation.navigate("appointment__details");
    const _onPressBookingAppointment = () => navigation.navigate("appointment__booking");

    const _renderScene = SceneMap(_createSceneMap(state?.routes, _onPressItem, Scene, {}, loading));
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
