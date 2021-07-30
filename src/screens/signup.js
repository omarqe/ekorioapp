import React from "react";
import Button from "../components/button";
import Container from "../components/container";
import { Text } from "react-native";

export default function SignUpScreen({ navigation: nav }) {
    return (
        <Container>
            <Text>Sign up screen</Text>
            <Button text="Back" onPress={() => nav.goBack()} />
        </Container>
    );
}
