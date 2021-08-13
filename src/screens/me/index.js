import React, { useContext } from "react";
import CT from "../../const";
import Context from "../../components/context";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import List from "../../components/list";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import Container from "../../components/container";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

const MeScreen = ({ navigation }) => {
    const go = (name) => navigation.navigate(name);
    const auth = useContext(Context.Auth);
    const sections = [
        {
            title: "Personal",
            note: "For every two people signed up to Ekorio using your referral link, you will receive one additional pet slot.",
            data: [
                {
                    icon: "cog",
                    text: "Account Settings",
                    onPress: go.bind(null, "account_settings"),
                    subtitle: "Update your account details",
                },
                {
                    icon: "key",
                    text: "Update Password",
                    onPress: go.bind(null, "account_password"),
                    subtitle: "Update your account password",
                },
                {
                    icon: "gift",
                    text: "Refer Friends",
                    onPress: go.bind(null, "referral"),
                    subtitle: "Share Ekorio with your friends",
                },
            ],
        },
        {
            title: "Feedbacks",
            data: [
                { icon: "grin-stars", text: "Rate us on App Store", subtitle: "Like Ekorio? Give us 5 stars on App Store" },
                { icon: "envelope", text: "Send Feedback", subtitle: "Send feedback or enquiry via email" },
            ],
        },
        {
            title: "Resources",
            data: [
                { icon: "lock-alt", text: "Privacy Policy", subtitle: "Learn how we use your data" },
                { icon: "info-circle", text: "About Us", subtitle: "Learn more about us" },
                { icon: "life-ring", text: "Help & Support", subtitle: "Find help on how to use our app" },
            ],
        },
    ];

    return (
        <Container>
            <TopBar type={2} />
            <Layout gray withHeader>
                <Header>
                    <Heading
                        text="Eve Harrison"
                        subtitle="Member since 2 weeks ago"
                        textStyle={styles.headerText}
                        subtitleStyle={styles.headerSub}
                    />
                </Header>
                <Body gray flex expanded>
                    <List sections={sections} />
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={auth.onLogout}>
                        <Text style={styles.logout}>Log out from account</Text>
                    </TouchableOpacity>
                </Body>
            </Layout>
        </Container>
    );
};

const styles = StyleSheet.create({
    headerText: {
        color: CT.BG_PURPLE_50,
        fontSize: 18,
        marginBottom: 2,
    },
    headerSub: {
        color: CT.BG_PURPLE_300,
    },
    logout: {
        color: CT.CTA_NEGATIVE,
        padding: 15,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },
});

export default MeScreen;
