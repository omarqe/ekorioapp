import React from "react";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import { StyleSheet } from "react-native";

const MeScreen = () => {
    return (
        <Container>
            <TopBar type={1} title="Me" leftIcon="arrow-left" />
        </Container>
    );
};

const ss = StyleSheet.create({});

export default MeScreen;
