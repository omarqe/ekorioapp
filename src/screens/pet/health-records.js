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

import pets from "../../../data/pets.json";

import { StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import _first from "lodash/first";
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

const PetHealthRecordsScreen = ({ navigation, route }) => {
    const [petID, setPetID] = useState(null);
    const [state, setState] = useState({
        index: 0,
        routes: [
            {
                key: "general",
                label: "General",
                data: [
                    {
                        text: "Friday, 13 August 2021",
                        subtitle: "Cheshire was infected by virus and needs ...",
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
                data: [],
            },
            {
                key: "surgery",
                label: "Surgery",
                data: [],
            },
            {
                key: "others",
                label: "Others",
                data: [],
            },
        ],
    });

    // Initialisation
    useEffect(() => {
        setPetID(route?.params?.petID ? route?.params?.petID : _first(pets)?.id);
    }, []);

    const _onIndexChange = (index) => setState({ ...state, index });
    const _onPressItem = (index) => navigation.navigate("pet__health-details");
    const _renderScene = SceneMap(_createSceneMap(state?.routes, _onPressItem, Scene));
    const _renderTabBar = ({ navigationState: state }) => (
        <Header style={styles.header}>
            <Tabs tabs={state?.routes} active={state?.index} onPress={_onIndexChange} alwaysBounceHorizontal={false} />
        </Header>
    );
    const _onSwitch = (id, index) => {
        setPetID(id);
    };

    return (
        <Container>
            <TopBar
                type={1}
                title="Health Records"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightComponent={<PetSwitch pets={pets} checked={petID} onSwitch={_onSwitch} />}
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
