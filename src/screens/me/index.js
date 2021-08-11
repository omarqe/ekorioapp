import React from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

const MeScreen = () => {
    return (
        <Container>
            <TopBar type={2} />
            <Layout gray withHeader>
                <Header>
                    <Heading
                        text="Eve Harrison"
                        subtitle="Member since 2 weeks ago"
                        textStyle={styles.headerText}
                        subtitleStyle={styles.headerSub}
                    />
                </Header>
                <Body gray flex></Body>
            </Layout>
        </Container>
    );
};

const styles = StyleSheet.create({
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
