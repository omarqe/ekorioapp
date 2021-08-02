import React from "react";
import CT from "../const.json";
import Context from "../components/context";
import Container from "../components/container";
import LoginComponent from "../components/auth/login-component";

export default function SignupScreen({ navigation }) {
    const Provider = Context.Login.Provider;
    const fields = [
        { type: "name", label: "Full Name", placeholder: "John Doe" },
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
    ];

    return (
        <Container bgColor={CT.BG_PURPLE_900} paddingX={0}>
            <Provider value={{ fields, navigation }}>
                <LoginComponent
                    title="Create a free account"
                    subtitle="Please enter your details below."
                    btnLabel="Create Account"
                />
            </Provider>
        </Container>
    );
}
