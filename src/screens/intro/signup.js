import React from "react";
import CT from "../../const.js";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/intro/login-component";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

export default function SignupScreen({ navigation }) {
    const onSubmit = () => navigation.navigate("signup-verify");
    const Provider = Context.Login.Provider;
    const fields = [
        { type: "name", label: "Full Name", placeholder: "John Doe" },
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
        { type: "phone", label: "Phone Number", placeholder: "123456789" },
    ];

    return (
        <KeyboardAvoiding>
            <Container bgColor={CT.BG_PURPLE_900} paddingX={0} isLogin>
                <Provider value={{ fields, navigation, onSubmit, grouping: true, swapTitle: true }}>
                    <LoginComponent
                        title="Create a free account"
                        subtitle="Please enter your details below."
                        btnLabel="Send Verification Code"
                    />
                </Provider>
            </Container>
        </KeyboardAvoiding>
    );
}
