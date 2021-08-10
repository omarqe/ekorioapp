import React from "react";
import CT from "../../const.json";
import PropTypes from "prop-types";

import ChartCatIcon from "../../../assets/icons/chart__cat.svg";
import ChartMeatIcon from "../../../assets/icons/chart__meat.svg";
import ChartThreadIcon from "../../../assets/icons/chart__thread.svg";

import { ProgressChart } from "react-native-chart-kit";
import { View, Text, StyleSheet } from "react-native";

import _isArray from "lodash/isArray";
import _startCase from "lodash/startCase";

const columnw = 100;
const Charts = ({ data = [] }) => {
    const progressBg = CT.BG_WHITE;
    const chartIcons = {
        physical: ChartCatIcon,
        nutrition: ChartMeatIcon,
        lifestyle: ChartThreadIcon,
    };

    if (_isArray(data) && data.length > 0) {
        return (
            <View style={ss.container}>
                {data.map(({ id, value, label, indicator = "down", delta = 0.1 }, i) => {
                    const ChartIcon = chartIcons[id];
                    const vPer100 = (value * 100).toFixed(0);
                    const dPer100 = (delta * 100).toFixed(0);

                    return (
                        <View key={i} style={ss.column}>
                            <View style={ss.chart}>
                                <ProgressChart
                                    withCustomBarColorFromData
                                    hideLegend
                                    width={columnw}
                                    height={columnw}
                                    radius={44}
                                    strokeWidth={12}
                                    style={{}}
                                    data={{
                                        colors: [CT.BG_PURPLE_500],
                                        data: [value],
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
                                {id && <ChartIcon style={ss.chartIcon} />}
                            </View>

                            <View style={ss.chartOverview}>
                                <Text style={ss.chartValueLg}>
                                    {vPer100}
                                    <Text style={ss.chartValueSymbol}>%</Text>
                                </Text>
                                <Text style={ss.chartLabel}>{label}</Text>
                                <Text style={ss.chartDesc}>
                                    {_startCase(indicator)} {dPer100}% from last week
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }

    return "";
};

const ss = StyleSheet.create({
    container: {
        height: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: CT.BODY_RADIUS,
    },
    column: {
        flex: 1,
        width: columnw,
        maxWidth: columnw,
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
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    chartValueLg: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "700",
        marginLeft: 5,
    },
    chartValueSymbol: {
        color: CT.BG_GRAY_400,
        fontSize: 20,
        fontWeight: "600",
    },
    chartLabel: {
        color: CT.BG_GRAY_700,
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 3,
    },
    chartDesc: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 14,
        marginTop: 3,
    },
});

Charts.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

export default Charts;
