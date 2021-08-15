import React, { useState } from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Tabs from "../../components/tabs";
import List from "../../components/list";
import Modal from "../../components/modal";
import Empty from "../../components/empty";
import TopBar from "../../components/topbar";
import PetOrb from "../../components/pet/pet-orb";
import PetSwitch from "../../components/pet/pet-switch";
import Container from "../../components/container";

import { View, StyleSheet } from "react-native";
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

const PetHealthRecordsScreen = ({ navigation }) => {
    const [petShown, setPetShown] = useState(false);
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

    const _onPressItem = (index) => {
        navigation.navigate("pet__health-details");
    };
    const _renderScene = SceneMap(_createSceneMap(state?.routes, _onPressItem, Scene));
    const _renderTabBar = ({ navigationState: state }) => (
        <Header style={styles.header}>
            <Tabs tabs={state?.routes} active={state?.index} onPress={_onIndexChange} alwaysBounceHorizontal={false} />
        </Header>
    );
    const _onIndexChange = (index) => setState({ ...state, index });

    const _onOpenPet = () => setPetShown(true);
    const _onClosePet = () => setPetShown(false);

    return (
        <Container>
            <TopBar
                type={1}
                title="Health Records"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightComponent={<PetSwitch onPress={_onOpenPet} />}
            />
            <TabView
                renderScene={_renderScene}
                renderTabBar={_renderTabBar}
                onIndexChange={_onIndexChange}
                navigationState={state}
            />
            <Modal title="Choose Pet" shown={petShown} onClose={_onClosePet}>
                <View style={styles.petListContainer}>
                    <PetOrb switcher checked />
                    <PetOrb switcher />
                </View>
            </Modal>
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
