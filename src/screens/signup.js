import React from "react";
import CT from "../const.json";
import Container from "../components/container";
import LoginComponent from "../components/auth/login-component";

export default function SignupScreen({ navigation }) {
    return (
        <Container bgColor={CT.BG_PURPLE_900} paddingX={0}>
            <LoginComponent
                nav={navigation}
                title="Create a free account"
                subtitle="Please enter your details below."
                btnLabel="Create Account"
            />
        </Container>
    );
}
