import React, { useState, useEffect } from "react";
import CT from "../../const";
import Text from "../../components/text";
import PetIdentity from "../../components/pet/pet-identity";
import DetailContainer from "../../components/detail-container";
import { Alert, Linking, StyleSheet } from "react-native";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import moment from "moment";

export default function AppointmentDetailsScreen({ navigation, route }) {
    const id = route?.params?.id;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    const _onCancelAppointment = () => {
        setLoadingAction(true);
        http.put("/appointments/cancel", net.data({ id, reason: "Cancelled by user" }))
            .then(({ data }) => {
                setLoadingAction(false);
                toast.fromData(data, "response[0].message");
                if (data?.success) {
                    navigation.navigate("appointment", { shouldRefresh: Date.now() });
                }
            })
            .catch(({ response }) => net.handleCatch(response, setLoadingAction));
    };

    const pet = data?.pet;
    const vet = data?.veterinar;
    const date = moment(data?.date);
    const topbar = { title: "Appointment Details", leftIcon: "arrow-left", leftIconProps: { onPress: navigation.goBack } };
    const heading = {
        subtitle: [vet?.name, vet?.city].join(", "),
        text: (
            <Text>
                {date.format(CT.DATE_FORMAT_PRETTY)}
                <Text style={styles.time}>
                    <Text style={styles.at}> @ </Text>
                    {date.format("h.mm")}
                    <Text style={styles.meridiem}>{date.format("a")}</Text>
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
                { text: "Confirm", style: "destructive", onPress: _onCancelAppointment },
            ]),
        ],
    };

    useEffect(() => {
        http.get(`/appointments/${id}`)
            .then(({ data }) => {
                setData(data);
                setLoading(false);
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    }, []);

    return (
        <DetailContainer
            loadingAction={loadingAction}
            loading={loading}
            topbar={topbar}
            heading={heading}
            badgeText="Checkup"
            bannerIcon="directions"
            bannerOptions="onGetDirections"
            {...options}
        >
            <PetIdentity data={pet} loading={loading} />
        </DetailContainer>
    );
}

const styles = StyleSheet.create({
    at: {
        color: CT.BG_GRAY_200,
        fontSize: 16,
    },
    time: {
        fontSize: 14,
        fontWeight: "700",
    },
    meridiem: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        fontWeight: "500",
    },
});
