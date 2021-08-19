import React, { useState } from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Tabs from "../../components/tabs";
import List from "../../components/list";
import Empty from "../../components/empty";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { Text, StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import _renderIf from "../../functions/renderIf";
import _createSceneMap from "../../functions/createSceneMap";

const Scene = ({ data, onPress }) => {
    return (
        <Layout scrollEnabled={false} gray>
            <Body gray flex expanded>
                {_renderIf(
                    data?.length > 0,
                    <List list={data} onPress={onPress} padded bounces scrollEnabled />,
                    <Empty title="Oh mom, look it's empty! 👀" subtitle="Your upcoming appointments will appear here" />
                )}
            </Body>
        </Layout>
    );
};

const AppointmentScreen = ({ navigation }) => {
    const Time = () => (
        <Text>
            Fri, 13 Aug 2021 <Text style={{ color: CT.BG_GRAY_200 }}>@</Text> 3:00
            <Text style={{ color: CT.BG_GRAY_500, fontSize: 12, fontWeight: "600" }}>pm</Text>
        </Text>
    );

    const [state, setState] = useState({
        index: 0,
        routes: [
            {
                key: "general",
                label: "General",
                data: [
                    {
                        text: <Time />,
                        subtitle: "Petsville Animal Clinic, Cyberjaya",
                        badge: { text: "Pending" },
                        tags: [
                            // { icon: "clock", text: "3:00pm" },
                            { icon: "stethoscope", text: "Checkup" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                    {
                        text: <Time />,
                        subtitle: "Petsville Animal Clinic, Cyberjaya",
                        badge: { text: "Confirmed" },
                        tags: [
                            // { icon: "clock", text: "3:00pm" },
                            { icon: "stethoscope", text: "Checkup" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                ],
            },
            {
                key: "boarding",
                label: "Boarding",
                data: [
                    {
                        text: <Time />,
                        subtitle: "Catzonia, Petaling Jaya",
                        badge: { text: "Pending" },
                        tags: [
                            // { icon: "clock", text: "3:00pm" },
                            { icon: "magic", text: "Grooming" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                    {
                        text: <Time />,
                        subtitle: "Catzonia, Petaling Jaya",
                        badge: { text: "Pending" },
                        tags: [
                            // { icon: "clock", text: "3:00pm" },
                            { icon: "concierge-bell", text: "Boarding" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                ],
            },
            {
                key: "surgery",
                label: "Surgery",
                data: [],
            },
            {
                key: "others",
                label: "Others",
                data: [
                    {
                        text: <Time />,
                        subtitle: "Catzonia, Petaling Jaya",
                        badge: { text: "Pending" },
                        tags: [
                            // { icon: "clock", text: "3:00pm" },
                            { icon: "stethoscope", text: "Service" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                ],
            },
        ],
    });

    const _onIndexChange = (index) => setState({ ...state, index });
    const _onPressItem = (index) => navigation.navigate("appointment__details");
    const _onPressBookingAppointment = () => navigation.navigate("appointment__booking");

    const _renderScene = SceneMap(_createSceneMap(state?.routes, _onPressItem, Scene));
    const _renderTabBar = ({ navigationState: state }) => (
        <Header style={styles.header}>
            <Tabs tabs={state?.routes} active={state?.index} onPress={_onIndexChange} alwaysBounceHorizontal={false} />
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
    header: {
        paddingBottom: 0,
    },
});

export default AppointmentScreen;
