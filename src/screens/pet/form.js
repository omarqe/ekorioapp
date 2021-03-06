import React, { useState, useEffect } from "react";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";
import { View, StyleSheet } from "react-native";

import * as FileSystem from "expo-file-system";

import CT from "../../const";
import Pet from "../../components/pet";
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

import _map from "lodash/map";
import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _clone from "lodash/clone";
import _sortBy from "lodash/sortBy";
import _toLower from "lodash/toLower";
import _capitalize from "lodash/capitalize";
import _makeBirthdate from "../../functions/makeBirthdate";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import onOpenGallery from "../../functions/onOpenGallery";

const PetFormScreen = connectActionSheet(({ navigation, route }) => {
    const petID = _get(route, "params.id", null);
    const recentPhotoFromCamera = route?.params?.recentPhoto; // Photo taken directly from camera

    const { showActionSheetWithOptions } = useActionSheet();
    const [data, setData] = useState(null);
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [localImage, setLocalImage] = useState(null);
    const [localImageBase64, setLocalImageBase64] = useState(null);

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
            setData({ ...data, gender: "male", birthday: new Date() });
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

    useEffect(() => {
        if (localImage !== null && localImage?.length > 0) {
            FileSystem.readAsStringAsync(localImage, { encoding: "base64" }).then((base64) => {
                setLocalImageBase64(base64);
            });
        }
    }, [localImage]);

    useEffect(() => {
        if (recentPhotoFromCamera && recentPhotoFromCamera?.length > 0) {
            setLocalImage(recentPhotoFromCamera);
        }
    }, [recentPhotoFromCamera]);

    const _onOpenGallery = async () => onOpenGallery(setLocalImage);
    const _onOpenCamera = async () => navigation.navigate("camera", { petID });

    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onChangePetSpecies = (speciesId) => {
        if (speciesId !== data?.speciesId) {
            setData({ ...data, speciesId, breedId: null });
        }
    };
    const _onChangePhoto = () => {
        let options = ["Open Camera", "Choose from Gallery"];
        let hasImage = data?.image && data?.image?.length > 0;
        if (hasImage) {
            options = [...options, "Remove Image"];
        }
        options = [...options, "Cancel"];

        const cancelButtonIndex = options?.length - 1;
        const destructiveButtonIndex = hasImage ? 2 : null;

        showActionSheetWithOptions({ options, cancelButtonIndex, destructiveButtonIndex }, (buttonIndex) => {
            const cmd = [_onOpenCamera, _onOpenGallery];
            if (typeof cmd[buttonIndex] === "function") {
                cmd[buttonIndex]();
            }
        });
    };
    const _onSubmit = () => {
        // If we're uploading profile picture for this pet, use the base64
        if (localImage && localImageBase64) {
            data.image = localImageBase64;
        }

        setLoading(true);
        (isUpdate ? http.put("/pets/update", net.data(data)) : http.post("/pets/create", net.data(data)))
            .then(({ data }) => {
                if (data?.success) {
                    toast.fromData(data, "response[0].message");
                    navigation.navigate("home", { recentPet: data?.payload });
                }
                setLoading(false);
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    };

    const disabled = loading || !data?.speciesId;
    const isUpdate = petID !== null;
    const pageTitle = isUpdate ? "Update Pet" : "Add Pet";

    const breeds = _find(species, { id: data?.speciesId })?.breeds;
    const breedNameFromOptions = _find(breeds, { id: data?.breedId })?.name || "Unknown Breed";
    const breedOptions = _sortBy(
        (breeds ?? []).map(({ name: label, id: value }) => {
            return { label, value };
        }),
        "label"
    );
    breedOptions.splice(_findIndex(breedOptions, { value: "others" }), 1);

    let disabledSpecies = [];
    if (isUpdate) {
        disabledSpecies = _map(species, "id");
        disabledSpecies.splice(disabledSpecies.indexOf(data?.species?.id), 1);
    }

    const birthday = data?.birthday || new Date();
    const fields = [
        {
            label: "Name",
            name: "name",
            value: data?.name,
            placeholder: "Give your pet a name",
        },
        {
            name: "microchipId",
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
                options: [...breedOptions, { label: "Others", value: "others" }],
                disabled: disabled || isUpdate,
                defaultValue: "others",
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
            { name: "weight", value: data?.weight, label: "Weight (kg)", type: "decimal", placeholder: "0.00" },
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
                            image={localImage ?? data?.image}
                            onPress={_onChangePhoto}
                            nameStyle={styles.petName}
                            baseStyle={styles.petBase}
                            useLocalImage={localImage !== null && localImage?.length > 0}
                            imageBaseStyle={styles.petImageBase}
                            phIconProps={{ color: CT.BG_PURPLE_200 }}
                        />
                        <Badge text={breedNameFromOptions} style={styles.petBadge} color="purple_dark" />
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
                            {disabled && !isUpdate && !loading && (
                                <View style={styles.overlay}>
                                    <Heading text="Please choose pet species first" centered />
                                </View>
                            )}
                        </View>
                        <Button text={pageTitle} color="yellow" disabled={disabled} loading={loading} onPress={_onSubmit} />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
    );
});

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

export default PetFormScreen;
