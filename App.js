import React from "react";
import CT from "./src/const.json";
import ArtIntro from "./assets/arts/intro-screen.svg";
import Container from "./src/components/container";
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Button from "./src/components/button";

export default function App() {
    return (
        <Container style={ss.container} paddingX={40}>
            <View style={ss.artContainer}>
                <ArtIntro width={280} height={325} />
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
