import React, { useState } from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";
import TopBar from "../../components/topbar";
import Calendar from "../../components/calendar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

export default function AppointmentBookingScreen({ navigation }) {
    const [header, setHeader] = useState({});
    const _onHeaderLayout = (e) => setHeader(e.nativeEvent?.layout);

    return (
        <Container>
            <TopBar title="Book Appointment" leftIcon="arrow-left" leftIconProps={{ onPress: navigation.goBack }} />
            <Layout gray withHeader>
                <Header onLayout={_onHeaderLayout} contentStyle={styles.headerContent} overlap>
                    <Calendar width={header?.width} showDayStragglers />
                </Header>
                <Body gray flex overlap topRounded></Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        paddingLeft: 0,
        paddingRight: 0,
    },
});
