import React from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";

import List from "../../components/list";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

const NotificationScreen = () => {
    const data = [
        {
            text: "Nam laoreet lectus non sapien!",
            icon: "cat",
            subtitle: "Vestibulum tincidunt ligula lorem, at ullamcorper metus.",
        },
        {
            text: "Suspendisse pellentesque porta!",
            icon: "cat",
            subtitle: "Cras ornare sit amet leo a sagittis nullam convallis.",
        },
        {
            text: "Quisque posuere odio a magna",
            icon: "cat",
            subtitle: "Sed porttitor metus non molestie tristique vestibulum.",
        },
    ];

    return (
        <Container>
            <TopBar type={1} title="Notifications" />
            <Layout gray withHeader>
                <Body gray flex expanded>
                    <List list={data} padded />
                </Body>
            </Layout>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default NotificationScreen;
