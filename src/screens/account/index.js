import React, { useState, useContext, useEffect } from "react";
import CT from "../../const";
import Context from "../../components/context";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import Text from "../../components/text";
import List from "../../components/list";
import TopBar from "../../components/topbar";
import Shimmer from "../../components/shimmer";
import Heading from "../../components/heading";
import Container from "../../components/container";

import { View, StyleSheet, TouchableOpacity } from "react-native";

import net from "../../functions/net";
import http from "../../functions/http";
import store from "../../functions/store";
import moment from "moment";
import _renderIf from "../../functions/renderIf";

const AccountScreen = ({ navigation, route }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const go = (name) => navigation.navigate(name);
    const auth = useContext(Context.Auth);
    const since = moment(user?.createdAt).fromNow();
    const sections = [
        {
            title: "Personal",
            note: "For every two people signed up to Ekorio using your referral link, you will receive one additional pet slot.",
            data: [
                {
                    icon: "cog",
                    text: "Account Settings",
                    onPress: navigation.navigate.bind(null, "account__settings", { user }),
                    subtitle: "Update your account details",
                },
                {
                    icon: "key",
                    text: "Update Password",
                    onPress: go.bind(null, "account__password"),
                    subtitle: "Update your account password",
                },
                {
                    icon: "files-medical",
                    text: "Health Records",
                    onPress: go.bind(null, "pet__health-records"),
                    subtitle: "View your pets' health records",
                },
                {
                    icon: "gift",
                    text: "Refer Friends",
                    onPress: go.bind(null, "account__referral"),
                    subtitle: "Invite your friends to Ekorio",
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

    const onLogout = () => {
        Promise.all([store.delete("token"), store.delete("uid")]).then(() => {
            if (typeof auth.setUID === "function") auth.setUID(null);
            if (typeof auth.setToken === "function") auth.setToken(null);
            if (typeof auth.setAuthed === "function") auth.setAuthed(false);
        });
    };

    useEffect(() => {
        // Get user's data
        store.get("uid").then((uid) => {
            http.get(`/users/${uid}`)
                .then(({ data: user }) => {
                    setUser(user);
                    setLoading(false);
                })
                .catch(({ response }) => net.handleCatch(response, setLoading));
        });
    }, []);

    // Refresh data
    useEffect(() => {
        setLoading(true);
        http.get(`/users/${user?.id}`)
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    }, [route?.params?.shouldRefresh]);

    return (
        <Container>
            <TopBar type={2} />
            <Layout gray withHeader>
                <Header>
                    {_renderIf(
                        loading,
                        <View style={{ flexDirection: "column" }}>
                            <Shimmer color="purple" />
                            <Shimmer color="purple" width={100} height={8} style={{ marginTop: 5 }} />
                        </View>,
                        <Heading
                            text={user?.name}
                            subtitle={`Member since ${since}`}
                            textStyle={styles.headerText}
                            subtitleStyle={styles.headerSub}
                            gapless
                        />
                    )}
                </Header>
                <Body gray flex expanded>
                    <List sections={sections} loading={loading} />
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={onLogout}>
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
        marginBottom: 2,
    },
    headerSub: {
        color: CT.BG_PURPLE_300,
    },
    logout: {
        color: CT.CTA_NEGATIVE,
        padding: 15,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },
});

export default AccountScreen;
