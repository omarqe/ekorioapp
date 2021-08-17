import React, { useState } from "react";
import CT from "../../const";

import Body from "../../components/layout/body";
import List from "../../components/list";
import Input from "../../components/input";
import Modal from "../../components/modal";
import Banner from "../../components/banner";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Header from "../../components/layout/header";
import Heading from "../../components/heading";
import Container from "../../components/container";
import ButtonIcon from "../../components/button-icon";
import CalendarStrip from "../../components/calendar-strip";

import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";

import moment from "moment";

export default function AppointmentBookingScreen({ navigation }) {
    const today = moment().toDate();
    const datesWhitelist = [{ start: moment(), end: moment().add(1, "month") }];
    // const markedDates = [{ date: moment().add(1, "day"), dots: [{ color: CT.BG_YELLOW_500 }] }];

    const [vetSearchModal, setVetSearchModal] = useState(false);
    const [date, setDate] = useState(today);
    const [pressed, setPressed] = useState(false);
    const [vetIndex, setVetIndex] = useState(null);

    const _onDateSelected = (date) => setDate(moment(date));
    const _onSearchVetClose = () => setVetSearchModal(false);
    const _onSearchVet = () => setVetSearchModal(true);
    const _onResetDate = () => setDate(today);
    const _onChooseVet = (index) => {
        setVetIndex(index);
        setVetSearchModal(false);
    };

    const ModalHeader = () => {
        return (
            <React.Fragment>
                <View style={styles.address}>
                    <Text style={styles.addressKicker}>Current location</Text>
                    <Text style={styles.addressText}>161, Jalan Teknokrat 5, 63000 Cyberjaya, Selangor</Text>
                </View>
                <Input style={styles.searchInput} icon="search" placeholder="Search for veterinar..." />
            </React.Fragment>
        );
    };

    const veterinars = [
        {
            text: "Petsville Animal Clinic, Cyberjaya",
            subtitle: "D-G-3A, Jalan Vita 1, Plaza Crystalville, Lingkaran Cyber",
            badge: { text: "Checkup" },
        },
        {
            text: "Felycat Animal Clinic, Cyberjaya",
            subtitle: "Ground Floor G-75, Biz Avenue II, Lingkaran Cyber",
            badge: { text: "Checkup" },
        },
        {
            text: "Petunia Animal Clinic, Puchong",
            subtitle: "GM-30A, Jalan Putra Perdana 5d/1, Taman Putra Perdana",
            badge: { text: "Checkup" },
        },
        {
            text: "Bandar Puteri Vet Clinic, Puchong",
            subtitle: "16, Jalan Puteri 5/8, Bandar Puteri, 47100 Puchong",
            badge: { text: "Checkup" },
        },
    ];

    const vet = veterinars[vetIndex];
    const bannerStyle = pressed ? { transform: [{ translateY: 2 }] } : {};
    const bannerContentStyle = { ...styles.bannerContent, backgroundColor: pressed ? CT.BG_GRAY_50 : CT.BG_WHITE };

    return (
        <Container>
            <TopBar
                title="Pick Date &amp; Time"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightIcon={moment(date).isAfter(today) ? "undo" : null}
                rightIconProps={{ onPress: _onResetDate, disabled: !moment(date).isAfter(today) }}
            />
            <Layout gray withHeader>
                <Header style={styles.header} contentStyle={styles.headerContent}>
                    <CalendarStrip selectedDate={date} datesWhitelist={datesWhitelist} onDateSelected={_onDateSelected} />
                </Header>
                <View style={styles.bannerContainer}>
                    <Pressable
                        onPress={_onSearchVet}
                        onPressIn={setPressed.bind(null, true)}
                        onPressOut={setPressed.bind(null, false)}
                    >
                        <Banner style={bannerStyle} contentStyle={bannerContentStyle}>
                            <Heading
                                style={styles.heading}
                                kicker="Your veterinarian:"
                                text={vet ? vet.text : "Please select a veterinar"}
                                gapless
                            />
                            <ButtonIcon
                                icon="map-marker-alt"
                                weight="fas"
                                iconProps={{ color: CT.CTA_NEGATIVE }}
                                onPress={_onSearchVet}
                                inverted
                            />
                        </Banner>
                    </Pressable>
                </View>
                <Body gray flex topRounded></Body>
            </Layout>

            <Modal
                avoidKeyboard
                onClose={_onSearchVetClose}
                open={vetSearchModal}
                title="Find Veterinar"
                theme="purple"
                style={styles.modal}
                headerStyle={styles.modalHeader}
                contentStyle={styles.modalContent}
                headerChildren={<ModalHeader />}
            >
                <ScrollView style={styles.searchResults} onStartShouldSetResponder={() => true}>
                    <List list={veterinars} onPress={_onChooseVet} padded />
                </ScrollView>
            </Modal>
        </Container>
    );
}

const bannerHeight = 38;
const styles = StyleSheet.create({
    searchResults: {
        maxHeight: CT.SCREEN_HEIGHT / 2,
        paddingBottom: 50,
    },
    address: {
        paddingBottom: 15,
    },
    addressKicker: {
        color: CT.BG_PURPLE_400,
        fontWeight: "500",
        marginBottom: 3,
    },
    addressText: {
        color: CT.BG_PURPLE_100,
        fontSize: 16,
        fontWeight: "600",
    },

    modal: {
        backgroundColor: CT.BG_GRAY_50,
    },
    modalHeader: {
        paddingBottom: 25,
    },
    modalContent: {
        padding: 0,
        paddingBottom: 0,
    },
    heading: {
        marginRight: "auto",
    },
    header: {
        paddingBottom: 0,
    },
    headerContent: {
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    bannerContainer: {
        zIndex: 90,
        position: "relative",
        marginBottom: -bannerHeight,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    bannerContent: {
        flexDirection: "row",
    },
    searchInput: {
        borderWidth: 0,
    },
});
