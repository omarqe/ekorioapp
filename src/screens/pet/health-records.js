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

import { TabView } from "react-native-tab-view";
import { StyleSheet } from "react-native";

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

const PetHealthRecordsScreen = ({ navigation, route }) => {
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

    // Initialisation
    useEffect(() => {
        const petID = route?.params?.petID;
        setPetID(petID ? petID : _first(pets)?.id);
    }, []);

    const pets = [];
    const scenes = _createSceneMap(state?.routes, Scene);
    const _onIndexChange = (index) => setState({ ...state, index });
    const _onPressItem = (index) => navigation.navigate("pet__health-details");
    const _renderScene = ({ route }) => {
        const key = route?.key;
        const Scene = scenes[key];
        if (Scene !== undefined && Scene !== null) {
            return <Scene />;
        }
    };
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
