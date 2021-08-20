import React, { useState } from "react";
import CT from "../../const";

import PetTypes from "../../components/pet/pet-types";
import Pet from "../../components/pet";
import Badge from "../../components/badge";
import Button from "../../components/button";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import Container from "../../components/container";
import FloatingFields from "../../components/floating-fields";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import _capitalize from "lodash/capitalize";

import { View, StyleSheet } from "react-native";

export default function PetFormScreen({ navigation }) {
    const [petType, setPetType] = useState("cat");
    const fields = [
        { label: "Name", value: "Cheshire" },
        { label: "Microchip ID", placeholder: "" },
        [
            {
                type: "select",
                label: "Gender",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
            {
                type: "select",
                label: "Breed",
                options: [
                    { label: "British Shorthair", value: "00001" },
                    { label: "Maine Coon", value: "00002" },
                ],
            },
        ],
        [
            { label: "Birthday", placeholder: "01/01/2021" },
            { label: "Weight (kg)", type: "number", value: "2.50" },
        ],
        {
            type: "textarea",
            label: "Biography",
        },
    ];

    return (
        <Container>
            <TopBar
                title="Add a Pet"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightIcon="ellipsis-h"
            />
            <Layout gray withHeader>
                <Header contentStyle={styles.headerContent} overlap>
                    <Pet
                        name="Cheshire"
                        borderRadius={35}
                        padding={5}
                        size={130}
                        image={require("../../../assets/pets/cat-04.png")}
                        nameStyle={styles.petName}
                        baseStyle={styles.petBase}
                        imageBaseStyle={styles.petImageBase}
                        phIconProps={{ color: CT.BG_PURPLE_200 }}
                    />
                    <Badge text="Breed: Maine Coon" style={styles.petBadge} color="purple" />
                </Header>
                <Body gray flex overlap topRounded>
                    <View style={styles.section}>
                        <Heading text="Pet Type" />
                        <PetTypes types={["cat", "dog", "rabbit", "bird"]} active={petType} onPress={setPetType} />
                    </View>
                    <View style={[styles.section, { marginBottom: 15 }]}>
                        <Heading text="Pet Details" />
                        <FloatingFields fields={fields} />
                    </View>
                    <Button text="Add Pet" color="yellow" />
                </Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    headerContent: {
        alignItems: "center",
        flexDirection: "column",
    },
    petName: {
        color: CT.BG_PURPLE_100,
        fontSize: 22,
        fontWeight: "700",
        marginTop: 15,
    },
    petBase: {
        backgroundColor: CT.BG_PURPLE_100,
        ...CT.SHADOW_LG,
    },
    petImageBase: {
        backgroundColor: CT.BG_PURPLE_300,
    },
    petBadge: {
        marginTop: 3,
    },
});
