import React from "react";
import CT from "../../const.js";
import PropTypes from "prop-types";

import ChartCatIcon from "../../../assets/icons/chart__cat.svg";
import ChartMeatIcon from "../../../assets/icons/chart__meat.svg";
import ChartThreadIcon from "../../../assets/icons/chart__thread.svg";

import { ProgressChart } from "react-native-chart-kit";
import { View, Text, StyleSheet } from "react-native";

import _isArray from "lodash/isArray";
import _startCase from "lodash/startCase";

const lowRatio = CT.PIXELRATIO < 3;
const columnw = lowRatio ? 90 : 100;

export default function HealthCharts({ data = [] }) {
    const chartBg = CT.BG_WHITE;
    const mappedData = {
        physical: {
            icon: ChartCatIcon,
            label: "Physical",
        },
        nutrition: {
            icon: ChartMeatIcon,
            label: "Nutrition",
        },
        lifestyle: {
            icon: ChartThreadIcon,
            label: "Lifestyle",
        },
    };

    if (_isArray(data) && data.length > 0) {
        return (
            <View style={styles.container}>
                {data.map(({ id, value, indicator = "down", delta = 0.1 }, i) => {
                    const ChartIcon = mappedData[id]?.icon;
                    const vPer100 = (value * 100).toFixed(0);
                    const dPer100 = (delta * 100).toFixed(0);

                    return (
                        <View key={i} style={styles.column}>
                            <View style={styles.chart}>
                                <ProgressChart
                                    withCustomBarColorFromData
                                    hideLegend
                                    width={columnw}
                                    height={columnw}
                                    radius={lowRatio ? 40 : 44}
                                    strokeWidth={lowRatio ? 10 : 12}
                                    data={{
                                        colors: [CT.BG_PURPLE_500],
                                        data: [value],
                                    }}
                                    chartConfig={{
                                        backgroundGradientFrom: chartBg,
                                        backgroundGradientTo: chartBg,
                                        decimalPlaces: 2,
                                        color: () => CT.BG_GRAY_50,
                                        style: {
                                            margin: 0,
                                            padding: 10,
                                            borderRadius: 16,
                                        },
                                    }}
                                />
                                {id && <ChartIcon style={styles.chartIcon} />}
                            </View>

                            <View style={styles.chartOverview}>
                                <Text style={styles.chartValueLg}>
                                    {vPer100}
                                    <Text style={styles.chartValueSymbol}>%</Text>
                                </Text>
                                <Text style={styles.chartLabel}>{mappedData[id]?.label}</Text>
                                <Text style={styles.chartDesc}>
                                    {_startCase(indicator)} {dPer100}% from last week
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
        color: CT.FONT_COLOR,
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: 5,
    },
    chartValueSymbol: {
        color: CT.BG_GRAY_400,
        fontSize: 20,
        fontWeight: "600",
    },
    chartLabel: {
        color: CT.FONT_COLOR,
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

HealthCharts.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};
