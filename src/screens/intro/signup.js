import React from "react";
import CT from "../../const.json";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/auth/login-component";

export default function SignupScreen({ navigation }) {
    const onSubmit = () => navigation.navigate("signup-verify");
    const Provider = Context.Login.Provider;
    const fields = [
        { type: "name", label: "Full Name", placeholder: "John Doe" },
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
        { type: "phone", label: "Phone Number", placeholder: "+601234567890" },
    ];

    return (
        <Container bgColor={CT.BG_PURPLE_900} paddingX={0} isLogin>
            <Provider value={{ fields, navigation, onSubmit, grouping: true, swapTitle: true }}>
                <LoginComponent
                    title="Create a free account"
                    subtitle="Please enter your details below."
                    btnLabel="Send Verification Code"
                />
            </Provider>
        </Container>
    );
}
