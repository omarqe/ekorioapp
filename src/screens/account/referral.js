import React from "react";
import CT from "../../const";
import Icon from "../../components/icon";
import Heading from "../../components/heading";

import Body from "../../components/layout/body";
import Text from "../../components/text";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import CatLaptopArt from "../../../assets/arts/ginger-cat-759.svg";

import { Share, View, Linking, StyleSheet, TouchableOpacity } from "react-native";

export default function AccountReferralScreen({ navigation, route }) {
    const { user: data } = route?.params ?? {};
    const refBaseURL = process.env.REFERRAL_URL ?? "https://ekorioadmin.vercel.app/signup";
    const refURL = `${refBaseURL}?ref=${data?.refId}`;
    const shareContent = `Hi, I'm inviting you to join Ekorio. Click here to sign up: ${refURL}`;

    const _onShare = async () => await Share.share({ url: refURL, message: shareContent });
    const _onPress = (type) => {
        switch (type) {
            case "facebook":
                return Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${refURL}&quote=${shareContent}`);
            case "whatsapp":
            case "telegram":
                return Linking.openURL(`${type}://send?text=${shareContent}`);
            case "twitter":
                return Linking.openURL(`twitter://post?message=${shareContent}`);
        }
    };

    const shareIcons = [
        { icon: "fab facebook", bgColor: "#1877F2", onPress: _onPress.bind(null, "facebook") },
        { icon: "fab twitter", bgColor: "#20A1F2", onPress: _onPress.bind(null, "twitter") },
        { icon: "fab whatsapp", bgColor: "#30D366", onPress: _onPress.bind(null, "whatsapp") },
        // { icon: "fab telegram", bgColor: "#379AD8" },
        // { icon: "fab facebook-messenger", bgColor: "#0099FF" },
        { icon: "far ellipsis-h", color: CT.BG_GRAY_400, bgColor: CT.BG_GRAY_100, onPress: _onShare },
    ];

    return (
        <Container>
            <TopBar type={1} title="Refer Friends" leftIcon="arrow-left" leftIconProps={{ onPress: navigation.goBack }} />
            <Layout bounces={false} gray withHeader>
                <Body style={styles.center} gray flex topRounded>
                    <View style={{ ...styles.section, marginBottom: 15 }}>
                        <Heading size={1} text="Need extra pet slot?" textStyle={styles.headingText} gapless />
                        <Heading size={1} text="Refer your friends to Ekorio now!" textStyle={styles.headingText} />
                        <Text style={styles.description}>
                            For every two successful referrals, you will get one additional pet slot.
                        </Text>
                    </View>
                    <View>
                        <CatLaptopArt height={150} />
                    </View>
                    <View style={{ ...styles.section, padding: 10, marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: CT.BG_GRAY_500 }}>Share this link to your friends:</Text>
                        <Text style={styles.refURL} selectable>
                            {refURL}
                        </Text>
                    </View>
                    <View style={styles.shareIconContainer}>
                        {shareIcons.map(({ icon, color = CT.BG_WHITE, bgColor: backgroundColor, onPress }, i) => (
                            <TouchableOpacity
                                key={i}
                                style={{ ...styles.shareIcon, backgroundColor }}
                                onPress={onPress}
                                activeOpacity={0.7}
                            >
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
        lineHeight: 28,
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
        fontSize: 14,
        lineHeight: 20,
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
    refURL: {
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 10,
        lineHeight: 20,
        textAlign: "center",
    },
});
