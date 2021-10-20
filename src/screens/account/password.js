import React, { useState } from "react";
import CT from "../../const";

import Button from "../../components/button";
import Heading from "../../components/heading";
import FloatingFields from "../../components/floating-fields";

import Body from "../../components/layout/body";
import Text from "../../components/text";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import { View, StyleSheet } from "react-native";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import store from "../../functions/store";

export default function AccountPasswordScreen({ navigation }) {
    const [data, setData] = useState({ old_password: "", password: "", confirm_password: "" });
    const [loading, setLoading] = useState(false);

    const fieldGroups = [
        {
            heading: "Old Password",
            fields: [
                {
                    name: "old_password",
                    type: "password",
                    label: "Old Password",
                    value: data?.old_password,
                    placeholder: "••••••••",
                },
            ],
        },
        {
            heading: "New Password",
            fields: [
                {
                    name: "password",
                    type: "password",
                    label: "New Password",
                    value: data?.password,
                    placeholder: "••••••••",
                    strengthGuide: true,
                },
                {
                    name: "confirm_password",
                    type: "password",
                    label: "Confirm New Password",
                    value: data?.confirm_password,
                    placeholder: "••••••••",
                    strengthGuide: true,
                },
            ],
        },
    ];
    const passwordPoints = [
        "At least 8 characters",
        "At least one special character (e.g: !@#$%^&*-)",
        "Contain of letters and numbers",
        "Contain of uppercase and lowercase letters",
    ];

    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onSubmit = () => {
        setLoading(true);
        store.get("uid").then((uid) => {
            data.id = uid;
            http.put("/users/change_password", net.data(data))
                .then(({ data }) => {
                    if (data?.success) {
                        navigation.goBack();
                        toast.fromData(data, "response[0].message");
                        setLoading(false);
                    }
                })
                .catch(({ response }) => net.handleCatch(response, setLoading));
        });
    };

    return (
        <KeyboardAvoiding>
            <Container>
                <TopBar
                    type={1}
                    title="Update Password"
                    leftIcon="arrow-left"
                    leftIconProps={{ onPress: navigation.goBack }}
                />
                <Layout bounces={false} gray withHeader>
                    <Body gray flex topRounded>
                        {fieldGroups.map(({ heading, description, fields }, i) => (
                            <View key={i} style={{ marginBottom: 25 }}>
                                <Heading text={heading} subtitle={description} />
                                <FloatingFields fields={fields} onChange={_onChange} disabled={loading} />
                            </View>
                        ))}

                        <View style={styles.guideContainer}>
                            <Text style={styles.guide}>Your password must:</Text>
                            {passwordPoints.map((text, i) => (
                                <View key={i} style={styles.item}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.guideBullet}>{text}</Text>
                                </View>
                            ))}
                        </View>

                        <Button text="Update Password" color="yellow" onPress={_onSubmit} loading={loading} />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
    );
}

const styles = StyleSheet.create({
    guideContainer: {
        marginBottom: 15,
    },
    guide: {
        color: CT.BG_GRAY_400,
        fontSize: 12,
        marginBottom: 8,
    },
    guideBullet: {
        color: CT.BG_GRAY_400,
        fontSize: 12,
        paddingLeft: 10,
        marginBottom: 8,
    },
    bullet: {
        color: CT.BG_GRAY_400,
        width: 5,
        height: 5,
        fontSize: 28,
        marginTop: -8,
        borderRadius: 5,
        backgroundColor: CT.BG_GRAY_400,
    },
    item: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        flexDirection: "row",
    },
});
