import React from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

export default function AccountSettingsScreen({ navigation }) {
    return (
        <Container>
            <TopBar type={1} title="Account Settings" leftIcon="arrow-left" leftIconProps={{ onPress: navigation.goBack }} />
            <Layout bounces={false} gray withHeader>
                <Body gray flex topRounded></Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({});
