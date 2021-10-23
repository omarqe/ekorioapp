import React from "react";
import CT from "../../const";
import Text from "../../components/text";
import Heading from "../../components/heading";
import PetIdentity from "../../components/pet/pet-identity";
import DetailContainer from "../../components/detail-container";

import { View, Linking, StyleSheet } from "react-native";

export default function PetHealthDetailsScreen({ navigation }) {
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

    const topbar = { title: "Health Details", leftIcon: "arrow-left", leftIconProps: { onPress: navigation.goBack } };
    const heading = { text: "Fri, 13 August 2021", subtitle: "Petsville Animal Clinic, Cyberjaya" };
    const options = {
        options: ["Call", "Send WhatsApp", "Cancel"],
        optionConfig: { cancelButtonIndex: 2 },
        optionCommands: [() => Linking.openURL("tel:+60 12-664 7006"), () => Linking.openURL("https://wa.me/60126647006")],
    };

    return (
        <DetailContainer
            id="6c2a-89cd"
            topbar={topbar}
            heading={heading}
            badgeText="Checkup"
            bannerIcon="directions"
            bannerOptions="onGetDirections"
            {...options}
        >
            <View style={[styles.section, { marginBottom: 20 }]}>
                <View style={styles.medCard}>
                    <Heading text="Diagnosis" badge={{ text: "Dr. Amalina" }} />
                    <Text style={styles.diagnosis}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat rutrum sem, in dapibus turpis
                        fermentum quis. Aliquam semper enim erat. Donec imperdiet a risus sit amet scelerisque.
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.medCard}>
                    <Heading text="Prescription" badge={{ text: 2 }} gapless />
                    <View style={styles.medicine}>
                        <Text style={styles.medName}>Tylosin Capsule</Text>
                        <Text style={styles.medDesc}>To treat diarrhea and intestinal tract.</Text>
                        <View style={styles.medBadges}>
                            <Text style={styles.medBadgeText}>1&times; morning</Text>
                            <Text style={styles.middot}>&bull;</Text>
                            <Text style={styles.medBadgeText}>1&times; evening</Text>
                        </View>
                    </View>
                    <View style={styles.medicine}>
                        <Text style={styles.medName}>Tylosin Capsule</Text>
                        <Text style={styles.medDesc}>To treat diarrhea and intestinal tract.</Text>
                        <View style={styles.medBadges}>
                            <Text style={styles.medBadgeText}>1&times; morning</Text>
                            <Text style={styles.middot}>&bull;</Text>
                            <Text style={styles.medBadgeText}>1&times; evening</Text>
                        </View>
                    </View>
                </View>
            </View>

            <PetIdentity data={petData} />
        </DetailContainer>
    );
}

const styles = StyleSheet.create({
    medCard: {
        ...CT.SHADOW_MD,
        padding: 15,
        position: "relative",
        borderRadius: 8,
        backgroundColor: CT.BG_WHITE,
    },
    medicine: {
        marginTop: 10,
        paddingVertical: 3,
    },
    middot: {
        top: -2,
        color: CT.BG_GRAY_100,
        fontSize: 18,
        marginHorizontal: 3,
    },
    medName: {
        color: CT.FONT_COLOR,
        fontSize: 12,
        fontWeight: "700",
    },
    medDesc: {
        color: CT.BG_GRAY_700,
        fontSize: 12,
        marginTop: 1,
    },
    medBadges: {
        display: "flex",
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    medBadgeText: {
        color: CT.BG_GRAY_300,
        fontSize: 12,
        fontWeight: "400",
    },

    section: {
        marginBottom: 30,
    },
    diagnosis: {
        color: CT.BG_GRAY_600,
        fontSize: 12,
        lineHeight: 20,
    },
});
