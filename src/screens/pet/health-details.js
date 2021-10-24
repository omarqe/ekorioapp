import React, { useState, useEffect } from "react";
import CT from "../../const";
import Text from "../../components/text";
import Shimmer from "../../components/shimmer";
import Heading from "../../components/heading";
import PetIdentity from "../../components/pet/pet-identity";
import DetailContainer from "../../components/detail-container";

import { View, Linking, StyleSheet } from "react-native";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import moment from "moment";

import _renderIf from "../../functions/renderIf";

export default function PetHealthDetailsScreen({ navigation, route }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const pet = data?.pet;
    const vet = data?.veterinar;
    const date = moment(data?.date);
    const topbar = { title: "Health Details", leftIcon: "arrow-left", leftIconProps: { onPress: navigation.goBack } };
    const heading = {
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
        subtitle: [vet?.name, vet?.city].join(", "),
    };
    const options = {
        options: ["Call", "Send WhatsApp", "Cancel"],
        optionConfig: { cancelButtonIndex: 2 },
        optionCommands: [() => Linking.openURL("tel:+60 12-664 7006"), () => Linking.openURL("https://wa.me/60126647006")],
    };

    useEffect(() => {
        http.get(`/appointments/${route?.params?.id}`)
            .then(({ data }) => {
                setLoading(false);
                if (Object.keys(data)?.length > 0) {
                    setData(data);
                    return;
                }
                toast.fromData(data, "response[0].message");
                navigation.goBack();
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    }, []);

    return (
        <DetailContainer
            topbar={topbar}
            loading={loading}
            heading={heading}
            badgeText="Checkup"
            bannerIcon="directions"
            bannerOptions="onGetDirections"
            {...options}
        >
            <View style={[styles.section, { marginBottom: 20 }]}>
                <View style={styles.medCard}>
                    <Heading text="Diagnosis" />
                    {_renderIf(
                        loading,
                        <View style={{ marginTop: 5 }}>
                            <Shimmer width={250} height={8} style={{ marginBottom: 8 }} />
                            <Shimmer width={210} height={8} style={{ marginBottom: 8 }} />
                            <Shimmer width={180} height={8} />
                        </View>,
                        <Text style={styles.diagnosis}>{data?.diagnosis || "No diagnosis avaialble."}</Text>
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.medCard}>
                    <Heading text="Prescription" badge={{ text: 2 }} gapless />
                    <View style={[styles.medicine, { paddingBottom: 0 }]}>
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

            <PetIdentity data={pet} loading={loading} />
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
