import React, { useContext } from "react";
import CT from "../../const.js";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/intro/login-component";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

export default function SigninScreen({ navigation }) {
    const Provider = Context.Login.Provider;
    const auth = useContext(Context.Auth);
    const fields = [
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
    ];

    const onSubmit = () => auth.onLogin(true); // temporary...

    return (
        <KeyboardAvoiding>
            <Container bgColor={CT.BG_PURPLE_900} paddingX={0} isLogin>
                <Provider value={{ fields, navigation, onSubmit, grouping: true }}>
                    <LoginComponent title="Welcome Back! 👋" subtitle="Please sign in to your account." btnLabel="Sign In" />
                </Provider>
            </Container>
        </KeyboardAvoiding>
    );
}
