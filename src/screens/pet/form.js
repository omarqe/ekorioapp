import React, { useState, useEffect } from "react";
import CT from "../../const";

import Pet from "../../components/pet";
import Text from "../../components/text";
import Badge from "../../components/badge";
import Button from "../../components/button";
import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import Container from "../../components/container";
import FloatingFields from "../../components/floating-fields";
import KeyboardAvoiding from "../../components/keyboard-avoiding";
import SpeciesList from "../../components/pet/species-list";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";
import { View, StyleSheet } from "react-native";

import _map from "lodash/map";
import _get from "lodash/get";
import _find from "lodash/find";
import _clone from "lodash/clone";
import _sortBy from "lodash/sortBy";
import _toLower from "lodash/toLower";
import _capitalize from "lodash/capitalize";
import _makeBirthdate from "../../functions/makeBirthdate";

import net from "../../functions/net";
import http from "../../functions/http";

export default function PetFormScreen({ navigation, route }) {
    const [data, setData] = useState(null);
    const [species, setSpecies] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    const petID = _get(route, "params.id", null);
    const disabled = !data?.speciesId;
    const isUpdate = petID !== null;
    const pageTitle = isUpdate ? "Update Pet" : "Add Pet";

    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onChangePetSpecies = (speciesId) => {
        if (speciesId !== data?.speciesId) {
            setData({ ...data, speciesId, breedId: null });
        }
    };

    const breeds = _find(species, { id: data?.speciesId })?.breeds;
    const breedNameFromOptions = _find(breeds, { id: data?.breedId })?.name || "Unknown Breed";
    const breedOptions = _sortBy(
        (breeds ?? []).map(({ name: label, id: value }) => {
            return { label, value };
        }),
        "label"
    );

    let disabledSpecies = [];
    if (isUpdate) {
        disabledSpecies = _map(species, "id");
        disabledSpecies.splice(disabledSpecies.indexOf(data?.species?.id), 1);
    }

    // Initialize
    useEffect(() => {
        if (isUpdate) {
            Promise.all([http.get(`/pets/${petID}`), http.get("/pets/species")])
                .then(([{ data }, { data: species }]) => {
                    if (species) setSpecies(species);
                    if (data) {
                        data.birthday = _makeBirthdate(data?.birthday);
                        data.breedId = data?.breed?.id;
                        data.speciesId = data?.species?.id;
                        setData(data);
                    }
                    setLoadingData(false);
                })
                .catch(([{ response: petResponse }]) => {
                    net.handleCatch(petResponse);
                    if (petResponse?.status === 404) {
                        navigation.goBack();
                    }
                    setLoadingData(false);
                });
        } else {
            http.get("/pets/species")
                .then(({ data }) => {
                    setSpecies(data);
                    setLoadingData(false);
                })
                .catch(({ response }) => {
                    net.handleCatch(response, setLoadingData);
                });
        }
    }, []);

    const genderIcon = { male: "far mars", female: "far venus" };
    const birthday = data?.birthday || new Date();
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
            value: data?.microchipId,
            guide: "This microchip ID is non-editable once verified by the admin.",
            disabled: disabled || (isUpdate && data?.microchipVerified),
            placeholder: "000000000000000",
        },
        [
            {
                name: "gender",
                type: "select",
                label: "Gender",
                value: data?.gender,
                disabled: disabled || isUpdate,
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
            {
                name: "breedId",
                type: "select",
                label: "Breed",
                value: data?.breedId,
                disabled: disabled || isUpdate,
                defaultValue: "others",
                options: [...breedOptions, { label: "Others", value: "others" }],
            },
        ],
        [
            {
                name: "birthday",
                type: "date",
                value: birthday,
                label: "Birthday",
                disabled: disabled || isUpdate,
                dateFormat: CT.DATE_FORMAT_PRETTY,
            },
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
            <Container loading={loadingData}>
                <TopBar
                    title={pageTitle}
                    leftIcon="arrow-left"
                    leftIconProps={{ onPress: navigation.goBack }}
                    rightIcon="ellipsis-h"
                />
                <Layout gray withHeader>
                    <Header contentStyle={styles.headerContent} overlap>
                        <Pet
                            name={data?.name || "Unnamed Pet"}
                            borderRadius={35}
                            padding={5}
                            size={130}
                            image={data?.imageURL}
                            nameStyle={styles.petName}
                            baseStyle={styles.petBase}
                            imageBaseStyle={styles.petImageBase}
                            phIconProps={{ color: CT.BG_PURPLE_200 }}
                        />
                        <Badge text={breedNameFromOptions} style={styles.petBadge} color="purple" />
                    </Header>
                    <Body gray flex overlap topRounded>
                        <View style={styles.section}>
                            <Heading text={isUpdate ? "Pet Species" : "Choose Species"} />
                            <SpeciesList
                                data={species}
                                active={data?.speciesId}
                                onPress={_onChangePetSpecies}
                                disabled={disabledSpecies}
                            />
                        </View>
                        <View style={[styles.section, { marginBottom: 15 }]}>
                            <Heading text="Pet Details" disabled={disabled} />
                            <FloatingFields fields={fields} onChange={_onChange} disabled={disabled} />
                            {disabled && (
                                <View style={styles.overlay}>
                                    <Heading text="Please choose pet species first" centered />
                                </View>
                            )}
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
        position: "relative",
        marginBottom: 30,
    },
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    headerContent: {
        alignItems: "center",
        flexDirection: "column",
    },
    petName: {
        color: CT.BG_PURPLE_100,
        fontSize: 18,
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
