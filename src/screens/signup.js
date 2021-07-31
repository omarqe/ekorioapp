import React from "react";
import CT from "../const.json";
import Button from "../components/button";
import WaveForm from "../../assets/wave-form.svg";
import Container from "../components/container";
import StarsBackdrop from "../components/stars-backdrop";
import { View, Text, StyleSheet } from "react-native";

export default function SignupScreen({ navigation: nav }) {
    return (
        <Container bgColor={CT.BG_PURPLE_900} paddingX={0}>
            <StarsBackdrop />
            <View style={ss.loginContainer}>
                <View style={ss.loginTop}></View>
                <View style={ss.loginHeader}>
                    <Text style={ss.headingText}>Create a free account</Text>
                    <Text style={ss.headingSubtitle}>Please enter your details below.</Text>
                </View>
                <View style={ss.loginContentContainer}>
                    <WaveForm />
                    <View style={ss.loginContent}>
                        <Text>part2</Text>
                        <Button label="Create Account" />
                    </View>
                </View>
            </View>
        </Container>
    );
}

const ss = StyleSheet.create({
    loginTop: {
        width: "100%",
        height: 50,
        paddingLeft: CT.LOGIN_CONTENT_PADDING,
        paddingRight: CT.LOGIN_CONTENT_PADDING,
    },

    loginContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    loginHeader: {
        flex: 1,
        padding: CT.LOGIN_CONTENT_PADDING,
        justifyContent: "center",
    },
    headingText: {
        color: CT.BG_WHITE,
        fontSize: 28,
        fontWeight: "700",
        paddingBottom: 2,
    },
    headingSubtitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 16,
        fontWeight: "500",
    },

    loginContentContainer: {
        flex: 1,
        position: "relative",
    },
    loginContent: {
        flex: 1,
        padding: CT.LOGIN_CONTENT_PADDING,
        backgroundColor: CT.BG_WHITE,
    },
});
