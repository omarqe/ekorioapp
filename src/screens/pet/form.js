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

import _map from "lodash/map";
import _find from "lodash/find";
import _clone from "lodash/clone";
import _sortBy from "lodash/sortBy";
import _capitalize from "lodash/capitalize";

import petTypesData from "../../../data/pet-types.json";

import { View, StyleSheet } from "react-native";

export default function PetFormScreen({ navigation, route }) {
    const [data, setData] = useState(null);
    const [formType, setFormType] = useState("add");

    const disabled = !data?.type;
    const isUpdate = formType === "update";
    const pageTitle = isUpdate ? "Update Pet" : "Add Pet";

    // Callbacks
    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onChangePetType = (type) => setData({ ...data, type, breedID: null });

    // Pet types
    let breeds = _find(petTypesData, { id: data?.type })?.breeds;
    let petTypes = _map(petTypesData, "id");
    let disabledPetTypes = [];
    if (isUpdate) {
        disabledPetTypes = _clone(petTypes);
        disabledPetTypes.splice(petTypes.indexOf(data?.type), 1);
    }

    // Breed name
    const breedName = _find(breeds, { value: data?.breedID })?.label ?? "Others";

    // Initialize
    useEffect(() => {
        if (route?.params) {
            setData(route?.params);
            setFormType("update");
            return;
        }
        setData({ ...data, breedID: "00000" });
    }, []);

    const fields = [
        {
            label: "Name",
            name: "name",
            value: data?.name,
            placeholder: "Give your pet a name",
        },
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
                options: [..._sortBy(breeds, "label"), { label: "Others", value: "00000" }],
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
                    title={pageTitle}
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
                        <Badge text={`Breed: ${breedName}`} style={styles.petBadge} color="purple" />
                    </Header>
                    <Body gray flex overlap topRounded>
                        <View style={styles.section}>
                            <Heading text={isUpdate ? "Species" : "Choose Species"} />
                            <PetTypes
                                types={petTypes}
                                active={data?.type}
                                onPress={_onChangePetType}
                                disabled={disabledPetTypes}
                            />
                        </View>
                        <View style={[styles.section, { marginBottom: 15 }]}>
                            <Heading text="Pet Details" disabled={disabled} />
                            <FloatingFields fields={fields} onChange={_onChange} disabled={disabled} />
                        </View>
                        <Button text={pageTitle} color="yellow" disabled={disabled} />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30,
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
