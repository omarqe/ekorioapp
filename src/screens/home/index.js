import React from "react";
// import CT from "../../const.json";

import Pet from "../../components/home/pet";
import Menu from "../../components/layout/menu";
import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import TopBar from "../../components/topbar";
import Button from "../../components/button";
import Heading from "../../components/heading";
import Container from "../../components/container";

import { View, StyleSheet } from "react-native";

export default function HomeScreen({ route }) {
    return (
        <Container>
            <TopBar
                type={2}
                leftIcon="arrow-left"
                rightIcon="bell"
                rightIconProps={{ onPress: () => alert("Opening notifications..") }}
                logoProps={{ onPress: () => alert("Moving up!") }}
            />

            <Layout withHeader>
                <Header horizontal>
                    <Pet active />
                    <Pet add />
                </Header>
                <Body>
                    <View style={ss.healthStatsHeading}>
                        <Heading text="Health Stats" subtitle="Last evaluated 3 weeks ago" style={{ marginRight: "auto" }} />
                        <View>
                            <Button label="Reevaluate Health" color="white" small />
                        </View>
                    </View>
                </Body>
            </Layout>

            <Menu name={route?.name} />
        </Container>
    );
}

const ss = StyleSheet.create({
    healthStatsHeading: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        flexDirection: "row",
    },
});
