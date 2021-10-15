import React, { useState, useContext } from "react";
import CT from "../../const.js";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/intro/login-component";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import qs from "qs";
import http from "../../functions/http";
import store from "../../functions/store";
import _clone from "lodash/clone";

export default function SigninScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });

    const Provider = Context.Login.Provider;
    const auth = useContext(Context.Auth);
    const fields = [
        { name: "email", type: "email", label: "Email Address", value: data?.email, placeholder: "john@email.com" },
        { name: "password", type: "password", label: "Password", value: data?.password, placeholder: "••••••••" },
    ];

    const onChange = (value, name) => setData({ ...data, [name]: value });
    const onSubmit = () => {
        setLoading(true);
        http.post("/auth/signin", qs.stringify({ email: data?.email, password: data?.password }))
            .then(({ data: o = {} }) => {
                setLoading(false);

                const { uid, token } = o?.payload ?? {};
                if (token?.length < 1) {
                    console.error("[Error 401]: Token is not good!");
                    return false;
                }

                auth.setAuthed(true);
                store.save("token", token);
                store.save("uid", uid?.toString());
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
                <Provider value={{ fields, navigation, onSubmit, onChange, loading, grouping: true }}>
                    <LoginComponent title="Welcome Back! 👋" subtitle="Please sign in to your account." btnLabel="Sign In" />
                </Provider>
            </Container>
        </KeyboardAvoiding>
    );
}
