import React, { useState, useContext } from "react";
import CT from "../../const.js";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/intro/login-component";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import qs from "qs";
import http from "../../functions/http";
import store from "../../functions/store";

export default function SigninScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const Provider = Context.Login.Provider;
    const auth = useContext(Context.Auth);
    const fields = [
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
    ];

    const onSubmit = () => {
        const email = "hello@omvr.io";
        const password = "123";

        setLoading(true);
        http.post("/auth/signin", qs.stringify({ email, password }))
            .then(({ data: o }) => {
                setLoading(false);

                const token = o?.payload?.token;
                if (token?.length < 1) {
                    console.error("[Error 401]: Token is not good!");
                    return false;
                }

                auth.setAuthed(true);
                store.save("token", token);
            })
            .catch(({ response = {} }) => {
                setLoading(false);
                const { data, status } = response;
                if (data) {
                    console.error(`[Error ${status}]: ${data.response[0].message}`);
                }
            });
    };

    return (
        <KeyboardAvoiding>
            <Container bgColor={CT.BG_PURPLE_900} paddingX={0} isLogin>
                <Provider value={{ fields, navigation, onSubmit, loading, grouping: true }}>
                    <LoginComponent title="Welcome Back! 👋" subtitle="Please sign in to your account." btnLabel="Sign In" />
                </Provider>
            </Container>
        </KeyboardAvoiding>
    );
}
