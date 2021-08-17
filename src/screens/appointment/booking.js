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
import Heading from "../../components/heading";
import Container from "../../components/container";
import CalendarStrip from "../../components/calendar-strip";
import FloatingFields from "../../components/floating-fields";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import { View, StyleSheet } from "react-native";

import moment from "moment";

export default function AppointmentBookingScreen({ navigation }) {
    const today = moment().toDate();
    const whitelistDates = [{ start: moment(), end: moment().add(1, "month") }];

    const [date, setDate] = useState(today);
    const [time, setTime] = useState(null);
    const [vetIndex, setVetIndex] = useState(null);
    const [vetPopup, setVetPopup] = useState(false);

    const data = [
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

    const fields = [
        [
            {
                type: "select",
                label: "Choose Pet",
                placeholder: "Please select",
                options: [{ value: 1, label: "Cheshire" }],
            },
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
        ],
        {
            type: "textarea",
            label: "Remarks",
            placeholder: "Write some remarks",
        },
    ];

    const _onResetDate = () => setDate(today);
    const _onSelectDate = (date) => setDate(moment(date));
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
                    rightIcon={moment(date).isAfter(today) ? "history" : null}
                    rightIconProps={{ onPress: _onResetDate, disabled: !moment(date).isAfter(today) }}
                />

                <Layout keyboardShouldPersistTaps="always" gray withHeader>
                    <Header style={styles.header} contentStyle={styles.headerContent}>
                        <CalendarStrip selectedDate={date} datesWhitelist={whitelistDates} onDateSelected={_onSelectDate} />
                    </Header>
                    <BookingBanner data={data[vetIndex]} offset={offset} onPress={_onVetPopupOpen} />
                    <Body style={styles.body} gray flex topRounded>
                        <View style={styles.section}>
                            <Heading text="Appointment Time" />
                            <BookingTime
                                onSelect={_onSelectTime}
                                hidden={[0, 1, 2, 3, 4, 5, 6, 7, 22, 23]}
                                unavailable={[8, 9]}
                                selected={time}
                            />
                        </View>

                        <View style={styles.section}>
                            <Heading text="Service Details" />
                            <FloatingFields fields={fields} />
                        </View>

                        <Button label="Book Appointment" />
                    </Body>
                </Layout>

                <BookingModal data={data} open={vetPopup} onClose={_onVetPopupClose} onChoose={_onChoose} />
            </Container>
        </KeyboardAvoiding>
    );
}

const offset = 38;
const styles = StyleSheet.create({
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
});
