import React from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { StyleSheet } from "react-native";

export default function PetHealthEvaluationScreen() {
    return (
        <Container>
            <TopBar type={1} title="Health Evaluation" />
            <Layout>
                <Body></Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({});
