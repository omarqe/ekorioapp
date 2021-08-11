import React from "react";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import { StyleSheet } from "react-native";

const AppointmentScreen = () => {
    return (
        <Container>
            <TopBar type={1} title="Appointments" rightIcon="plus" rightIconProps={{ glow: true }} />
        </Container>
    );
};

const ss = StyleSheet.create({});

export default AppointmentScreen;
