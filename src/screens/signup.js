import React from "react";
import CT from "../const.json";
import StarsBg from "../components/starsbg";
import Container from "../components/container";
import { View, StyleSheet } from "react-native";

export default function SignupScreen({ navigation: nav }) {
    return (
        <Container bgColor={CT.BG_PURPLE_900}>
            <StarsBg />
        </Container>
    );
}

const ss = StyleSheet.create({
    header: {},
});
