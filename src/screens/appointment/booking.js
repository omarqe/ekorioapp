import React, { useState } from "react";
import CT from "../../const";

import Header from "../../components/layout/header";
import Layout from "../../components/layout";
import Body from "../../components/layout/body";
import BookingTime from "../../components/appointmnet/booking-time";
import BookingModal from "../../components/appointmnet/booking-modal";
import BookingBanner from "../../components/appointmnet/booking-banner";

import TopBar from "../../components/topbar";
import Button from "../../components/button";
import PetList from "../../components/pet/pet-list";
import Heading from "../../components/heading";
import Container from "../../components/container";
import CalendarStrip from "../../components/calendar-strip";
import FloatingFields from "../../components/floating-fields";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import { Text, View, StyleSheet } from "react-native";

import _moment from "moment";
import _numeral from "numeral";

export default function AppointmentBookingScreen({ navigation }) {
    const today = _moment().toDate();
    const whitelistDates = [{ start: _moment(), end: _moment().add(1, "month") }];

    const [date, setDate] = useState(today);
    const [time, setTime] = useState(null);
    const [vetIndex, setVetIndex] = useState(null);
    const [vetPopup, setVetPopup] = useState(false);

    const data = [
        {
            text: "Petsville Animal Clinic, Cyberjaya",
            subtitle: "D-G-3A, Jalan Vita 1, Plaza Crystalville, Lingkaran Cyber",
        },
        {
            text: "Felycat Animal Clinic, Cyberjaya",
            subtitle: "Ground Floor G-75, Biz Avenue II, Lingkaran Cyber",
        },
        {
            text: "Petunia Animal Clinic, Puchong",
            subtitle: "GM-30A, Jalan Putra Perdana 5d/1, Taman Putra Perdana",
        },
        {
            text: "Bandar Puteri Vet Clinic, Puchong",
            subtitle: "16, Jalan Puteri 5/8, Bandar Puteri, 47100 Puchong",
        },
    ];

    const fields = [
        {
            type: "select",
            label: "Service Type",
            placeholder: "Please select",
            options: [
                { value: "general", label: "Health Checkup" },
                { value: "grooming", label: "Grooming" },
                { value: "boarding", label: "Boarding" },
                { value: "dermatology", label: "Dermatology" },
                { value: "surgery", label: "Surgery" },
            ],
        },
        {
            type: "textarea",
            label: "Remarks",
            placeholder: "Write some remarks",
        },
    ];

    const _onResetDate = () => setDate(today);
    const _onSelectDate = (date) => setDate(_moment(date));
    const _onSelectTime = (time) => setTime(time);

    const _onVetPopupOpen = () => setVetPopup(true);
    const _onVetPopupClose = () => setVetPopup(false);
    const _onChoose = (index) => {
        setVetIndex(index);
        setVetPopup(false);
    };

    return (
        <KeyboardAvoiding>
            <Container>
                <TopBar
                    title="Book Appointment"
                    leftIconProps={{ onPress: navigation.goBack }}
                    leftIcon="arrow-left"
                    rightIcon={_moment(date).isAfter(today) ? "history" : null}
                    rightIconProps={{ onPress: _onResetDate, disabled: !_moment(date).isAfter(today) }}
                />

                <Layout gray withHeader>
                    <Header style={styles.header} contentStyle={styles.headerContent}>
                        <CalendarStrip selectedDate={date} datesWhitelist={whitelistDates} onDateSelected={_onSelectDate} />
                    </Header>
                    <BookingBanner data={data[vetIndex]} offset={offset} onPress={_onVetPopupOpen} />
                    <Body style={styles.body} gray flex topRounded>
                        <View style={[styles.section, { marginBottom: 30 }]}>
                            <Heading text="Appointment Time" />
                            <BookingTime
                                onSelect={_onSelectTime}
                                hidden={[0, 1, 2, 3, 4, 5, 6, 7, 22, 23]}
                                unavailable={[8, 9]}
                                selected={time}
                            />
                        </View>

                        <View style={styles.section}>
                            <Heading text="Choose a Pet" />
                            <View style={styles.pets}>
                                <PetList checked={0} theme="light" />
                            </View>
                        </View>

                        <View style={[styles.section, { marginBottom: 10 }]}>
                            <FloatingFields fields={fields} />
                        </View>
                        <Button label="Book Appointment" />

                        <Text style={styles.summary}>
                            Your appointment will be set on{" "}
                            <Text style={styles.sumHighlight}>{_moment(date).format("ddd, D MMMM, YYYY")}</Text>
                            {" @ "}
                            <Text style={styles.sumHighlight}>{_numeral(time).format("00.00").replace(".", ":")}</Text>
                            {" at "}
                            <Text style={styles.sumHighlight}>{data[vetIndex]?.text}.</Text>
                        </Text>
                    </Body>
                </Layout>

                <BookingModal data={data} open={vetPopup} onClose={_onVetPopupClose} onChoose={_onChoose} />
            </Container>
        </KeyboardAvoiding>
    );
}

const offset = 38;
const styles = StyleSheet.create({
    pets: {
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    body: {
        paddingTop: offset + CT.VIEW_PADDING_X,
    },
    header: {
        paddingBottom: 0,
    },
    headerContent: {
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    section: {
        marginBottom: 20,
    },
    summary: {
        color: CT.BG_GRAY_300,
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    sumHighlight: {
        color: CT.BG_GRAY_400,
        fontWeight: "600",
    },
});
