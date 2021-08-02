import React from "react";
import CT from "../const.json";
import Container from "../components/container";
import LoginContext from "../components/auth/login-context";
import LoginComponent from "../components/auth/login-component";

export default function SignupScreen({ navigation }) {
    const fields = [
        { type: "name", label: "Full Name", placeholder: "John Doe" },
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
    ];

    return (
        <Container bgColor={CT.BG_PURPLE_900} paddingX={0}>
            <LoginContext.Provider value={{ fields, navigation }}>
                <LoginComponent
                    title="Create a free account"
                    subtitle="Please enter your details below."
                    btnLabel="Create Account"
                />
            </LoginContext.Provider>
        </Container>
    );
}
