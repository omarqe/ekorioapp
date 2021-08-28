import React, { useState } from "react";
import CT from "../const";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export default function ProgressBarSurvey({ n, total }) {
    const [trackWidth, setTrackWidth] = useState(0);
    const width = (n / total) * trackWidth;
    const backgroundColor = width === trackWidth ? CT.CTA_POSITIVE : CT.BG_YELLOW_500;
    const onLayout = (e) => setTrackWidth(e?.nativeEvent?.layout?.width);

    return (
        <View style={styles.track} onLayout={onLayout}>
            <View style={[styles.progress, { width, backgroundColor }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        width: "100%",
        height: 5,
        borderRadius: 5,
        backgroundColor: CT.BG_PURPLE_700,
    },
    progress: {
        height: 5,
        borderRadius: 5,
        backgroundColor: CT.BG_YELLOW_500,
    },
});

ProgressBarSurvey.propTypes = {
    n: PropTypes.number,
    total: PropTypes.number,
};
