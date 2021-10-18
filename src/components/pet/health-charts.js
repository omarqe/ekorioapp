import React, { useRef, useState, useEffect } from "react";
import CT from "../../const.js";
import Text from "../text";
import Icon from "../icon";
import Empty from "../empty";
import Shimmer from "../shimmer";
import PropTypes from "prop-types";

import ChartCatIcon from "../../../assets/icons/chart__cat.svg";
import ChartMeatIcon from "../../../assets/icons/chart__meat.svg";
import ChartThreadIcon from "../../../assets/icons/chart__thread.svg";

import { ProgressChart } from "react-native-chart-kit";
import { Easing, Animated, View, StyleSheet } from "react-native";

import _renderIf from "../../functions/renderIf";
import _fill from "lodash/fill";
import _clone from "lodash/clone";
import _sortBy from "lodash/sortBy";
import _isArray from "lodash/isArray";
import _startCase from "lodash/startCase";

const lowRatio = CT.PIXELRATIO < 3;
const columnw = lowRatio ? 90 : 100;

export default function HealthCharts({ data = [], loading = false, name = null, onStartSurvey }) {
    if (loading) {
        data = [];
        ["physical", "nutrition", "lifestyle"].map((id) => {
            data = [...data, { id, value: 0, delta: 0, indicator: "up" }];
        });
    } else if (data?.length < 1 && !loading) {
        return (
            <Empty
                style={styles.empty}
                title="No data available"
                subtitle={`You haven't answered a health survey for ${name ? name : "this pet"} yet.`}
                button={{
                    text: "Start Survey",
                    small: true,
                    onPress: onStartSurvey,
                }}
            />
        );
    }

    const [anim1, setAnim1] = useState(0);
    const [anim2, setAnim2] = useState(0);
    const [anim3, setAnim3] = useState(0);
    const animation1 = useRef(new Animated.Value(anim1)).current;
    const animation2 = useRef(new Animated.Value(anim2)).current;
    const animation3 = useRef(new Animated.Value(anim3)).current;

    const animate = (animval, value, onChange, easing = Easing.quad) => {
        const duration = CT.DEFAULT_ANIMATION_TIMING;
        const useNativeDriver = false;
        Animated.timing(animval, { toValue: value, easing, duration, useNativeDriver }).start();
        animval.addListener(({ value }) => onChange(value));
    };

    useEffect(() => {
        animate(animation1, data[0]?.value, setAnim1);
        animate(animation2, data[1]?.value, setAnim2);
        animate(animation3, data[2]?.value, setAnim3);
    }, [data, loading]);

    const values = [anim1, anim2, anim3];
    const chartBg = CT.BG_WHITE;
    const chartIcon = { physical: ChartCatIcon, nutrition: ChartMeatIcon, lifestyle: ChartThreadIcon };

    if (_isArray(data) && data?.length > 0) {
        _sortBy(data, "sorting");
        return (
            <View style={styles.container}>
                {data.map(({ id, indicator = "up", label, delta = 0.1, value: v }, i) => {
                    const ChartIcon = chartIcon[id];
                    const value = values[i];
                    const vPer100 = (v * 100).toFixed(0);
                    const dPer100 = (delta * 100).toFixed(0);
                    const indicatorIcon = { up: "chevron-circle-up", down: "chevron-circle-down" }[indicator];
                    const indicatorColor = indicator === "up" ? CT.CTA_POSITIVE : CT.CTA_NEGATIVE;
                    const chartProps = {
                        withCustomBarColorFromData: true,
                        hideLegend: true,
                        width: columnw,
                        height: columnw,
                        radius: lowRatio ? 40 : 44,
                        strokeWidth: lowRatio ? 10 : 12,
                        data: { colors: [loading ? CT.BG_GRAY_100 : CT.BG_PURPLE_500], data: [value] },
                        chartConfig: {
                            backgroundGradientFrom: chartBg,
                            backgroundGradientTo: chartBg,
                            decimalPlaces: 2,
                            color: () => CT.BG_GRAY_50,
                            style: {
                                margin: 0,
                                padding: 10,
                                borderRadius: 16,
                            },
                        },
                    };

                    return (
                        <View key={i} style={styles.column}>
                            <View style={styles.chart}>
                                <ProgressChart {...chartProps} />
                                {_renderIf(
                                    id && !loading && ChartIcon !== undefined,
                                    <ChartIcon style={styles.chartIcon} />,
                                    <Shimmer style={styles.shimmer} />
                                )}
                            </View>

                            <View style={[styles.chartOverview, { marginTop: loading ? 20 : 10 }]}>
                                {_renderIf(
                                    loading,
                                    <View style={{ alignItems: "center" }}>
                                        <Shimmer width={50} height={20} style={{ marginBottom: 8 }} />
                                        <Shimmer width={80} height={15} style={{ marginBottom: 5 }} />
                                        <Shimmer width={100} height={8} style={{ marginBottom: 5 }} />
                                        <Shimmer width={60} height={8} />
                                    </View>,
                                    <React.Fragment>
                                        <Text style={styles.chartValueLg} weight="700">
                                            {vPer100}
                                            <Text style={styles.chartValueSymbol} weight="600" mf>
                                                %
                                            </Text>
                                        </Text>
                                        <Text style={styles.chartLabel}>{label}</Text>
                                        <View style={styles.chartDesc}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Icon
                                                    size={10}
                                                    icon={indicatorIcon}
                                                    color={indicatorColor}
                                                    style={styles.indicatorIcon}
                                                />
                                                <Text style={[styles.chartDescValue, { color: indicatorColor }]}>
                                                    {`${vPer100}% `}
                                                </Text>
                                                <Text style={styles.chartDescText}>from</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.chartDescText}>previous record</Text>
                                            </View>
                                            <Text></Text>
                                        </View>

                                        {/* <Text style={styles.chartDesc}>
                                            <Text style={[styles.indicator, { color: indicatorColor }]}>
                                                <Icon icon={indicatorIcon} color={indicatorColor} size={10} /> {dPer100}%
                                            </Text>
                                            from previous record
                                        </Text> */}
                                    </React.Fragment>
                                )}
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
    empty: {
        paddingTop: 30,
        paddingBottom: 30,
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
    shimmer: {
        width: 35,
        height: 35,
        position: "absolute",
        borderRadius: 35,
    },

    chartOverview: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    chartValueLg: {
        color: CT.FONT_COLOR,
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: 5,
    },
    chartValueSymbol: {
        color: CT.BG_GRAY_400,
        fontSize: 18,
        fontWeight: "600",
    },
    chartLabel: {
        color: CT.FONT_COLOR,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 3,
    },
    chartDesc: {
        marginTop: 3,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
    },
    chartDescText: {
        color: CT.BG_GRAY_500,
        fontSize: 10,
        textAlign: "center",
    },
    chartDescValue: {
        fontSize: 10,
        fontWeight: "700",
    },
    indicator: {
        display: "flex",
    },
    indicatorIcon: {
        top: 1,
        position: "relative",
        marginRight: 2,
    },
});

HealthCharts.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    loading: PropTypes.bool,
    onStartSurvey: PropTypes.func,
};
