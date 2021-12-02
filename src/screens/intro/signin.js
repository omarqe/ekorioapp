import React, { useState, useContext } from "react";
import CT from "../../const.js";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/intro/login-component";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import store from "../../functions/store";
import hasMissingDataToVerify from "../../functions/hasMissingDataToVerify";

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
        http.post("/auth/signin", net.data(data))
            .then(({ data: o = {} }) => {
                setLoading(false);

                const { uid, token, csrf, cc, phone, verified } = o?.payload;
                if (token?.length < 1) {
                    toast.show(data?.response[0]?.message);
                    return;
                } else if (!verified) {
                    const verifyData = { uid, token, csrf, cc, phone };
                    if (hasMissingDataToVerify(verifyData)) {
                        toast.show(CT.ERRORS.MISSING_VERIFY_DATA);
                        return;
                    }
                    navigation.navigate("signup-verify", verifyData);
                    return;
                }

                auth.setUID(uid);
                auth.setToken({ token, csrf });
                auth.setAuthed(true);
                store.save("token", token);
                store.save("csrf", csrf);
                store.save("uid", uid?.toString());
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
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
