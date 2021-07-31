import React from "react";
import Stars from "../../assets/stars.svg";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StarsBg() {
    return (
        <View style={ss.starsBg}>
            <Stars />
            <LinearGradient style={ss.starsGradient} colors={["rgba(26,20,35,0)", "rgba(26,20,35,1)"]} />
        </View>
    );
}

const ss = StyleSheet.create({
    starsBg: {
        top: 0,
        left: 0,
        right: 0,
        position: "absolute",
    },
    starsGradient: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
});
