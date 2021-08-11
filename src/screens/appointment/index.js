import React from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
// import Header from "../../components/layout/header";

import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

const AppointmentScreen = () => {
    return (
        <Container>
            <TopBar type={1} title="Appointments" rightIcon="plus" rightIconProps={{ glow: true }} />
            <Layout gray withHeader>
                {/* <Header></Header> */}
                <Body gray flex></Body>
            </Layout>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default AppointmentScreen;
