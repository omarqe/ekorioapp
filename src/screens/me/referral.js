import React from "react";
import CT from "../../const";
import Icon from "../../components/icon";
import Heading from "../../components/heading";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function ReferralScreen({ navigation }) {
    const shareIcons = [
        { icon: "fab facebook", bgColor: "#1877F2" },
        { icon: "fab facebook-messenger", bgColor: "#0099FF" },
        { icon: "fab twitter", bgColor: "#20A1F2" },
        { icon: "fab telegram", bgColor: "#379AD8" },
        { icon: "fab whatsapp", bgColor: "#30D366" },
        { icon: "far ellipsis-h", color: CT.BG_GRAY_400, bgColor: CT.BG_GRAY_100 },
    ];

    return (
        <Container>
            <TopBar type={1} title="Refer Friends" leftIcon="arrow-left" leftIconProps={{ onPress: navigation.goBack }} />
            <Layout bounces={false} gray withHeader>
                <Body style={styles.center} gray flex topRounded>
                    <View style={{ ...styles.section, marginBottom: 50 }}>
                        <Heading size={1} text="Need extra pet slot?" textStyle={styles.headingText} gapless />
                        <Heading size={1} text="Refer your friends to Ekorio now!" textStyle={styles.headingText} />
                        <Text style={styles.description}>
                            Upon two successful referrals, you'll get one additional pet slow for your account.
                        </Text>
                    </View>

                    <View style={{ ...styles.section, marginTop: 50 }}>
                        <Heading
                            size={1}
                            kicker="Share this link to your friends:"
                            kickerStyle={{ ...styles.headingText, fontSize: 16 }}
                            textStyle={styles.headingText}
                            text="https://ref.ekor.io/j82khg"
                        />
                    </View>
                    <View style={styles.shareIconContainer}>
                        {shareIcons.map(({ icon, color = CT.BG_WHITE, bgColor: backgroundColor }, i) => (
                            <TouchableOpacity key={i} activeOpacity={0.7} style={{ ...styles.shareIcon, backgroundColor }}>
                                <Icon size={18} icon={icon} color={color} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({
    headingText: {
        textAlign: "center",
        lineHeight: 30,
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        width: "90%",
        display: "flex",
        alignItems: "center",
    },
    description: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 16,
        lineHeight: 22,
        marginTop: 5,
        textAlign: "center",
    },
    shareIconContainer: {
        flexDirection: "row",
        display: "flex",
        marginTop: 10,
    },
    shareIcon: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: 40,
        height: 40,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 40,
    },
});
