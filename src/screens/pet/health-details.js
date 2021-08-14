import React from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import Header from "../../components/layout/header";
import Layout from "../../components/layout";

import Badge from "../../components/badge";
import TopBar from "../../components/topbar";
import Banner from "../../components/banner";
import Heading from "../../components/heading";
import Container from "../../components/container";
import PetIdentity from "../../components/pet/pet-identity";

import { View, Alert, StyleSheet } from "react-native";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

const _PetHealthDetailsScreen = ({ navigation }) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const petData = [
        { label: "Name", value: "Cheshire" },
        { label: "Microchip ID", value: "0028031030021", verified: true },
        { label: "Parent's Name", value: "Eve Harrison" },
        { label: "Colors", value: ["#3E4C59", "#9AA5B1"] },
        { label: "Breed", value: "British Shorthair" },
        { label: "Birthday", value: "Jan 1, 2021" },
        { label: "Age (Cat Year)", value: "7 months" },
        { label: "Age (Human Year)", value: "11 years" },
        { label: "Gender", value: "Male" },
        { label: "Weight", value: "2.50 kg" },
    ];

    const onGetDirections = () => {
        const options = ["Waze", "Google Maps", "Cancel"];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
            const cmd = [alert.bind(null, "Opening Waze.."), alert.bind(null, "Opening Google Maps..")];
            if (typeof cmd[buttonIndex] === "function") {
                cmd[buttonIndex]();
            }
        });
    };

    return (
        <Container>
            <TopBar title="Health Details" leftIcon="arrow-left" leftIconProps={{ onPress: navigation.goBack }} />
            <Header contentStyle={styles.headerContent} style={styles.header}>
                <Banner style={styles.banner} wrapperStyle={styles.bannerWrapper}>
                    <View style={styles.bannerContent}>
                        <View style={styles.badgeContainer}>
                            <Badge text="Checkup" xs />
                        </View>
                        <Heading
                            size={1}
                            text="Friday, 13 August 2021"
                            subtitle="Petsville Animal Clinic, Cyberjaya"
                            gapless
                        />
                    </View>
                </Banner>
            </Header>
            <Layout gray>
                <Body style={styles.body} gray flex>
                    <PetIdentity data={petData} />
                </Body>
            </Layout>
        </Container>
    );
};

const offset = 35;
const styles = StyleSheet.create({
    body: {
        marginTop: offset,
    },
    header: {
        zIndex: 110,
        paddingBottom: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerContent: {
        paddingTop: 0,
        paddingLeft: 18,
        paddingRight: 18,
    },
    banner: {
        display: "flex",
        flexDirection: "row",
    },
    bannerWrapper: {
        marginBottom: -offset,
    },
    bannerContent: {
        flex: 1,
    },
    badgeContainer: {
        display: "flex",
        alignItems: "flex-start",
        paddingBottom: 5,
    },
    directions: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: CT.BG_WHITE,

        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",

        ...CT.SHADOW_LG,
    },
});

const PetHealthDetailsScreen = connectActionSheet(_PetHealthDetailsScreen);
export default PetHealthDetailsScreen;
