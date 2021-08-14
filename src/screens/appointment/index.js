import React, { useState } from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Tabs from "../../components/tabs";
import List from "../../components/list";
import Empty from "../../components/empty";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";
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
                    <Empty title="Oh mom, look it's empty! 👀" subtitle="Your pet appointment records will appear here" />
                )}
            </Body>
        </Layout>
    );
};

const AppointmentScreen = ({ navigation }) => {
    const [state, setState] = useState({
        index: 0,
        routes: [
            {
                key: "general",
                label: "General",
                data: [
                    {
                        text: "Friday, 13 August 2021",
                        subtitle: "General health checkups",
                        badge: { text: "Checkup" },
                        tags: [
                            { icon: "map-marker-alt", text: "Petsville Animal Clinic" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                    {
                        text: "Friday, 13 August 2021",
                        subtitle: "General health checkups",
                        badge: { text: "Checkup" },
                        tags: [
                            { icon: "map-marker-alt", text: "Petsville Animal Clinic" },
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
                        text: "Friday, 13 August 2021",
                        subtitle: "Parents went back to hometown.",
                        badge: { text: "Boarding" },
                        tags: [
                            { icon: "map-marker-alt", text: "Catzonia Petaling Jaya" },
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
                        text: "Friday, 13 August 2021",
                        subtitle: "Regular grooming",
                        badge: { text: "Grooming" },
                        tags: [
                            { icon: "map-marker-alt", text: "Catzonia Petaling Jaya" },
                            { icon: "cat", text: "Cheshire" },
                        ],
                    },
                ],
            },
        ],
    });

    const _onPressItem = (index) => {
        navigation.navigate("appointment_details");
    };

    const _renderScene = SceneMap(_createSceneMap(state?.routes, _onPressItem, Scene));
    const _renderTabBar = ({ navigationState: state }) => (
        <Header style={styles.header}>
            <Tabs tabs={state?.routes} active={state?.index} onPress={_onIndexChange} alwaysBounceHorizontal={false} />
        </Header>
    );
    const _onIndexChange = (index) => setState({ ...state, index });

    return (
        <Container>
            <TopBar type={1} title="Appointments" rightIcon="plus" rightIconProps={{ glow: true }} />
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
