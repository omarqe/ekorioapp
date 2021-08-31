import React from "react";
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

export default function AccountPasswordScreen({ navigation }) {
    const fieldGroups = [
        {
            heading: "Old Password",
            fields: [{ type: "password", label: "Old Password", defaultValue: "password" }],
        },
        {
            heading: "New Password",
            fields: [
                { type: "password", label: "New Password", placeholder: "••••••••", strengthGuide: true },
                { type: "password", label: "Confirm New Password", placeholder: "••••••••", strengthGuide: true },
            ],
        },
    ];

    const passwordPoints = [
        "At least 8 characters",
        "At least one special character (e.g: !@#$%^&*-)",
        "Contain of letters and numbers",
        "Contain of uppercase and lowercase letters",
    ];

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
                                <FloatingFields fields={fields} />
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

                        <Button text="Update Password" color="yellow" onPress={navigation.goBack} />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
    );
}

const styles = StyleSheet.create({
    guideContainer: {
        marginTop: 5,
        marginBottom: 15,
    },
    guide: {
        color: CT.BG_GRAY_400,
        fontSize: 16,
        marginBottom: 10,
    },
    guideBullet: {
        color: CT.BG_GRAY_400,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 10,
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
