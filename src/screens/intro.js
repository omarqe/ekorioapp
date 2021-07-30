import React from "react";
import CT from "../const.json";
import Button from "../components/button";
import IntroArt from "../../assets/arts/intro-screen.svg";
import Container from "../components/container";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function IntroScreen() {
    return (
        <Container style={ss.container} paddingX={40}>
            <View style={ss.artContainer}>
                <IntroArt width={280} height={325} />
            </View>

            <View style={ss.ctaContainer}>
                <Button text="Create an Account" style={{ marginBottom: 15 }} onPress={() => alert("Creating account...")} />
                <TouchableOpacity onPress={() => alert("Signing in...")}>
                    <Text style={ss.signInHint}>
                        Already a member? <Text style={ss.signInText}>Sign in.</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const ss = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CT.BG_PURPLE_900,
    },
    artContainer: {
        width: "100%",
        display: "flex",
        marginTop: "-50%",
        alignItems: "center",
    },
    ctaContainer: {
        width: "100%",
        bottom: 50,
        display: "flex",
        position: "absolute",
    },
    signInHint: {
        color: CT.BG_PURPLE_300,
        fontSize: 16,
        textAlign: "center",
    },
    signInText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
    },
});
