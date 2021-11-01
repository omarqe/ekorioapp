import React, { useState } from "react";
import CT from "../../const.js";
import Context from "../../components/context";
import Container from "../../components/container";
import LoginComponent from "../../components/intro/login-component";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import hasMissingDataToVerify from "../../functions/hasMissingDataToVerify";

export default function SignupScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ cc: 60, name: "", email: "", phone: "", password: "", birthday: new Date() });

    const onChange = (value, name) => setData({ ...data, [name]: value });
    const onSubmit = () => {
        setLoading(true);
        http.post("/users/create", net.data(data))
            .then((o) => {
                setLoading(false);
                const { data } = o;
                const { payload } = data;
                if (data?.success) {
                    const { id: uid, token, cc, phone } = payload;
                    const verifyData = { uid, token, cc, phone };
                    if (hasMissingDataToVerify(verifyData)) {
                        toast.show(CT.ERRORS.MISSING_VERIFY_DATA);
                        return;
                    }
                    navigation.navigate("signup-verify", verifyData);
                    return;
                }
                toast.fromData(data, "response[0].message");
                return;
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    };

    const Provider = Context.Login.Provider;
    const fields = [
        { name: "name", type: "name", label: "Full Name", value: data?.name, placeholder: "John Doe" },
        { name: "email", type: "email", label: "Email Address", value: data?.email, placeholder: "john@email.com" },
        { name: "password", type: "password", label: "Password", value: data?.password, placeholder: "••••••••" },
        {
            name: "phone",
            nameCC: "cc",
            type: "phone",
            label: "Phone Number",
            value: data?.phone,
            callingCode: data?.cc,
            placeholder: "123456789",
        },
    ];

    return (
        <KeyboardAvoiding>
            <Container bgColor={CT.BG_PURPLE_900} paddingX={0} isLogin>
                <Provider value={{ fields, navigation, onSubmit, onChange, loading, grouping: true, swapTitle: true }}>
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
