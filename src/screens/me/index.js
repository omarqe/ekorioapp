import React from "react";
import CT from "../../const";
import TopBar from "../../components/topbar";
import Header from "../../components/layout/header";
import Heading from "../../components/heading";
import Container from "../../components/container";
import { StyleSheet } from "react-native";

const MeScreen = () => {
    return (
        <Container>
            <TopBar type={2} title="Me" />
            <Header>
                <Heading
                    text="Eve Harrison"
                    subtitle="Joined 2 weeks ago"
                    textStyle={ss.headerText}
                    subtitleStyle={ss.headerSub}
                />
            </Header>
        </Container>
    );
};

const ss = StyleSheet.create({
    headerText: {
        color: CT.BG_PURPLE_50,
        fontSize: 18,
        marginBottom: 2,
    },
    headerSub: {
        color: CT.BG_PURPLE_300,
    },
});

export default MeScreen;
