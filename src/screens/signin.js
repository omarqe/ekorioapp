import React from "react";
import CT from "../const.json";
import Context from "../components/context";
import Container from "../components/container";
import LoginComponent from "../components/auth/login-component";

export default function SigninScreen({ navigation }) {
    const Provider = Context.Login.Provider;
    const fields = [
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
    ];

    return (
        <Container bgColor={CT.BG_PURPLE_900} paddingX={0}>
            <Provider value={{ fields, navigation, grouping: true }}>
                <LoginComponent title="Welcome Back! 👋" subtitle="Please sign in to your account." btnLabel="Sign In" />
            </Provider>
        </Container>
    );
}
