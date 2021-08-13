import React, { useState } from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Tabs from "../../components/tabs";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

const AppointmentScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = [{ label: "General" }, { label: "Boarding" }, { label: "Surgery" }, { label: "Others" }];

    return (
        <Container>
            <TopBar type={1} title="Appointments" rightIcon="plus" rightIconProps={{ glow: true }} />
            <Layout gray withHeader>
                <Header style={styles.header}>
                    <Tabs tabs={tabs} active={activeIndex} onPress={setActiveIndex} alwaysBounceHorizontal={false} />
                </Header>
                <Body gray flex></Body>
            </Layout>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: 0,
    },
});

export default AppointmentScreen;
