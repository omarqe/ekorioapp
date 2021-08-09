import React, { useState } from "react";
import CT from "../../const.json";

import Pet from "../../components/home/pet";
import Menu from "../../components/layout/menu";
import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import TopBar from "../../components/topbar";
import Button from "../../components/button";
import Heading from "../../components/heading";
import Container from "../../components/container";

import ChartCatIcon from "../../../assets/icons/chart__cat.svg";
import ChartMeatIcon from "../../../assets/icons/chart__meat.svg";
import ChartThreadIcon from "../../../assets/icons/chart__thread.svg";

import { ProgressChart } from "react-native-chart-kit";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen({ route }) {
    const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
    const progressBg = CT.BG_WHITE;
    const onProgressChart = (e) => {
        const { width, height } = e.nativeEvent?.layout;
        setChartSize({ width, height });
    };

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

                    <View style={ss.primaryStats}>
                        {[ChartCatIcon, ChartMeatIcon, ChartThreadIcon].map((ChartIcon, i) => (
                            <View key={i} style={ss.primaryStatsItem} onLayout={onProgressChart}>
                                <View style={ss.chart}>
                                    <ProgressChart
                                        withCustomBarColorFromData
                                        hideLegend
                                        width={chartSize?.width}
                                        height={chartSize?.height - 70}
                                        radius={48}
                                        strokeWidth={12}
                                        style={{ borderRadius: 16 }}
                                        data={{
                                            colors: [CT.BG_PURPLE_500],
                                            data: [0.22],
                                        }}
                                        chartConfig={{
                                            backgroundGradientFrom: progressBg,
                                            backgroundGradientTo: progressBg,
                                            decimalPlaces: 2,
                                            color: () => CT.BG_GRAY_50,
                                            style: {
                                                margin: 0,
                                                padding: 10,
                                                borderRadius: 16,
                                            },
                                        }}
                                    />
                                    <ChartIcon style={ss.chartIcon} />
                                </View>

                                <View style={ss.chartOverview}>
                                    <Text style={ss.chartValueLg}>
                                        20<Text style={ss.chartValueSymbol}>%</Text>
                                    </Text>
                                    <Text style={ss.chartLabel}>Physical</Text>
                                    <Text style={ss.chartDesc}>Down 10% from last week</Text>
                                </View>
                            </View>
                        ))}
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
    chartBody: {
        flex: 1,
        backgroundColor: CT.BG_GRAY_200,
    },
    primaryStats: {
        height: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: CT.BODY_RADIUS,
    },
    primaryStatsItem: {
        flex: 1,
    },
    chart: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    chartIcon: {
        position: "absolute",
    },
    chartOverview: {
        marginTop: -5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    chartValueLg: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "700",
        marginRight: -5,
    },
    chartValueSymbol: {
        color: CT.BG_GRAY_400,
        fontSize: 20,
        fontWeight: "600",
    },
    chartLabel: {
        marginTop: -2,
        color: CT.BG_GRAY_700,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
    },
    chartDesc: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 14,
        marginTop: 5,
    },
});
