import React from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

export default function AppointmentBookingScreen({ navigation }) {
    return (
        <Container>
            <TopBar
                title="Book Appointment"
                subtitle="Petsville Animal Clinic"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
            />
            <Layout gray withHeader>
                <Header overlap></Header>
                <Body gray flex overlap topRounded></Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({});
