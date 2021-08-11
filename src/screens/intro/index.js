import React from "react";
import CT from "../../const.js";
import Button from "../../components/button";
import StarsBackdrop from "../../components/intro/stars-backdrop";
import Container from "../../components/container";
import IntroArt from "../../../assets/arts/intro-screen.svg";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function IntroScreen({ navigation: nav }) {
    return (
        <Container style={styles.container} paddingX={40} isLogin>
            <StarsBackdrop />
            <View style={styles.artContainer}>
                <IntroArt width={280} height={325} />
            </View>

            <View style={styles.ctaContainer}>
                <Button label="Create a Free Account" style={{ marginBottom: 15 }} onPress={() => nav.navigate("signup")} />
                <TouchableOpacity onPress={() => nav.navigate("signin")}>
                    <Text style={styles.signInHint}>
                        Already a member? <Text style={styles.signInEmphasis}>Sign in.</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
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
    signInEmphasis: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
    },
});
