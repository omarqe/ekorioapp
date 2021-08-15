import React from "react";
import CT from "../../const";
import Icon from "../../components/icon";
import PetIdentity from "../../components/pet/pet-identity";
import DetailContainer from "../../components/detail-container";

import { Text, Alert, Linking, StyleSheet } from "react-native";

export default function AppointmentDetailsScreen({ navigation }) {
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

    const topbar = { title: "Appointment Details", leftIcon: "arrow-left", leftIconProps: { onPress: navigation.goBack } };
    const heading = {
        subtitle: "Petsville Animal Clinic, Cyberjaya",
        text: (
            <Text>
                Fri, 13 August{" "}
                <Text style={styles.time}>
                    <Text style={styles.at}>@</Text> 3.00<Text style={styles.meridiem}>pm</Text>
                </Text>
            </Text>
        ),
    };
    const options = {
        options: ["Call", "Send WhatsApp", "Cancel Appointment", "Cancel"],
        optionConfig: { cancelButtonIndex: 3, destructiveButtonIndex: 2 },
        optionCommands: [
            () => Linking.openURL("tel:+60 12-664 7006"),
            () => Linking.openURL("https://wa.me/60126647006"),
            Alert.alert.bind(null, "Are you sure?", "Are you sure you want to cancel this appointment?", [
                { text: "Cancel", style: "cancel", onPress: () => null },
                { text: "Confirm", style: "destructive", onPress: navigation.goBack },
            ]),
        ],
    };

    return (
        <DetailContainer
            topbar={topbar}
            heading={heading}
            badgeText="Checkup"
            bannerIcon="directions"
            bannerOptions="onGetDirections"
            {...options}
        >
            <PetIdentity data={petData} />
        </DetailContainer>
    );
}

const styles = StyleSheet.create({
    at: {
        color: CT.BG_GRAY_200,
        fontSize: 18,
    },
    time: {
        fontSize: 18,
        fontWeight: "700",
    },
    meridiem: {
        color: CT.BG_GRAY_500,
        fontSize: 18,
        fontWeight: "500",
    },
});
