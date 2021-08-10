import React from "react";
import CT from "../../const.js";

import Charts from "../../components/home/charts";
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
    const chartData = [
        {
            id: "physical",
            label: "Physical",
            value: 0.25,
            delta: 0.1,
            indicator: "up",
        },
        {
            id: "nutrition",
            label: "Nutrition",
            value: 0.55,
            delta: 0.25,
            indicator: "up",
        },
        {
            id: "lifestyle",
            label: "Lifestyle",
            value: 0.8,
            delta: 0.3,
            indicator: "up",
        },
    ];

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
                    <Charts data={chartData} />
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
