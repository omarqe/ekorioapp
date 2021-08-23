import React, { useState, useEffect } from "react";
import CT from "../../const";

import PetTypes from "../../components/pet/pet-types";
import Pet from "../../components/pet";
import Badge from "../../components/badge";
import Button from "../../components/button";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import Container from "../../components/container";
import FloatingFields from "../../components/floating-fields";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import _clone from "lodash/clone";
import _capitalize from "lodash/capitalize";

import { View, StyleSheet } from "react-native";

export default function PetFormScreen({ navigation, route }) {
    const [data, setData] = useState(null);
    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onChangePetType = (type) => setData({ ...data, type });

    let petTypes = ["cat", "dog", "rabbit", "bird"];
    let disabledPetTypes = [];
    if (data?.type) {
        disabledPetTypes = _clone(petTypes);
        disabledPetTypes.splice(petTypes.indexOf(data?.type), 1);
    }

    useEffect(() => {
        if (route?.params) setData(route?.params);
    }, []);

    const fields = [
        { label: "Name", name: "name", value: data?.name, placeholder: "Give your pet a name" },
        {
            name: "microchipID",
            label: "Microchip ID",
            value: data?.microchipID,
            guide: "This microchip ID is non-editable and may be verified by the admin.",
            placeholder: "000000000000000",
        },
        [
            {
                name: "gender",
                type: "select",
                label: "Gender",
                value: data?.gender,
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
            {
                name: "breedID",
                type: "select",
                label: "Breed",
                value: data?.breedID,
                options: [
                    { label: "British Shorthair", value: "00001" },
                    { label: "Maine Coon", value: "00002" },
                    { label: "Persian", value: "00003" },
                    { label: "Others", value: "00000" },
                ],
            },
        ],
        [
            { name: "birthday", value: data?.birthday, label: "Birthday", placeholder: "01/01/2021" },
            { name: "weight", value: data?.weight, label: "Weight (kg)", type: "number", placeholder: "0.00" },
        ],
        {
            name: "bio",
            type: "textarea",
            value: data?.bio,
            label: "Biography",
            placeholder: "Tell us something about your pet..",
        },
    ];

    return (
        <KeyboardAvoiding>
            <Container>
                <TopBar
                    title={data ? "Update Pet" : "Add Pet"}
                    leftIcon="arrow-left"
                    leftIconProps={{ onPress: navigation.goBack }}
                    rightIcon="ellipsis-h"
                />
                <Layout gray withHeader>
                    <Header contentStyle={styles.headerContent} overlap>
                        <Pet
                            name={data?.name ?? "Pet Name"}
                            borderRadius={35}
                            padding={5}
                            size={130}
                            image={data?.imageURL}
                            nameStyle={styles.petName}
                            baseStyle={styles.petBase}
                            imageBaseStyle={styles.petImageBase}
                            phIconProps={{ color: CT.BG_PURPLE_200 }}
                        />
                        <Badge text={`Breed: ${data?.breedName ?? "Others"}`} style={styles.petBadge} color="purple" />
                    </Header>
                    <Body gray flex overlap topRounded>
                        <View style={styles.section}>
                            <Heading text="Pet Type" />
                            <PetTypes
                                types={petTypes}
                                active={data?.type}
                                onPress={_onChangePetType}
                                disabled={disabledPetTypes}
                            />
                        </View>
                        <View style={[styles.section, { marginBottom: 15 }]}>
                            <Heading text="Pet Details" />
                            <FloatingFields fields={fields} onChange={_onChange} />
                        </View>
                        <Button text="Add Pet" color="yellow" />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
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
