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
import status from "../../functions/status";
import moment from "moment";

import _renderIf from "../../functions/renderIf";
import Message from "../../components/message";

export default function PetHealthDetailsScreen({ navigation, route }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const pet = data?.pet;
    const vet = data?.veterinar;
    const meds = data?.prescriptions || [];
    const date = moment(data?.date);
    const topbar = { title: "Health Details", leftIcon: "arrow-left", leftIconProps: { onPress: navigation.goBack } };
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
            badgeText={data?.service?.name}
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
                        _renderIf(
                            data?.diagnosis?.length > 0,
                            <Text style={styles.diagnosis}>{data?.diagnosis}</Text>,
                            <Message
                                title="No diagnosis added."
                                text="There's no diagnosis added by the veterinarian."
                                style={styles.message}
                            />
                        )
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.medCard}>
                    <Heading text="Prescription" badge={{ text: meds?.length }} />
                    {_renderIf(
                        loading,
                        <View style={{ marginTop: 0 }}>
                            <Shimmer width={100} height={10} style={{ marginBottom: 5 }} />
                            <Shimmer width={200} height={8} style={{ marginBottom: 10 }} />
                            <View style={{ flexDirection: "row" }}>
                                <Shimmer width={55} height={6} style={{ marginRight: 3 }} />
                                <Shimmer width={55} height={6} />
                            </View>
                        </View>,
                        <View style={{ marginTop: 0 }}>
                            {_renderIf(
                                meds?.length > 0,
                                meds.map(({ name, /*description,*/ ...rest }, i) => {
                                    let dot = -1;
                                    const labels = ["morning", "afternoon", "evening", "night"];
                                    return (
                                        <View key={i} style={[styles.medicine, { marginTop: i > 0 ? 10 : 0 }]}>
                                            <Text style={styles.medName}>{name}</Text>
                                            {/* <Text style={styles.medDesc}>{description || "No description."}</Text> */}
                                            <View style={styles.medBadges}>
                                                {labels.map((key, j) => {
                                                    const n = rest[key];
                                                    if (n > 0) {
                                                        dot++;
                                                        return (
                                                            <React.Fragment key={j}>
                                                                {dot > 0 && <Text style={styles.middot}>&bull;</Text>}
                                                                <Text style={styles.medBadgeText}>
                                                                    <Text style={styles.medBadgeTimes}>{n}&times;</Text>
                                                                    {` ${labels[j]}`}
                                                                </Text>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                })}
                                            </View>
                                        </View>
                                    );
                                }),
                                <Message
                                    title="No prescription added."
                                    text="The veterinarian did not add any meds."
                                    style={styles.message}
                                />
                            )}
                        </View>
                    )}
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
    },
    middot: {
        top: -4,
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
        marginTop: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    medBadgeText: {
        color: CT.BG_GRAY_400,
        fontSize: 12,
        fontWeight: "400",
    },
    medBadgeTimes: {
        color: CT.BG_GRAY_600,
        fontSize: 12,
        fontWeight: "600",
    },
    message: {
        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        backgroundColor: CT.BG_GRAY_50,
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
