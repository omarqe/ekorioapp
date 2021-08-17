import React, { useState } from "react";
import CT from "../../const";

import Header from "../../components/layout/header";
import Layout from "../../components/layout";
import Body from "../../components/layout/body";
import BookingTime from "../../components/appointmnet/booking-time";
import BookingModal from "../../components/appointmnet/booking-modal";
import BookingBanner from "../../components/appointmnet/booking-banner";

import TopBar from "../../components/topbar";
import Heading from "../../components/heading";
import Container from "../../components/container";
import CalendarStrip from "../../components/calendar-strip";

import { StyleSheet } from "react-native";

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
        <Container>
            <TopBar
                title="Book Appointment"
                leftIconProps={{ onPress: navigation.goBack }}
                leftIcon="arrow-left"
                rightIcon={moment(date).isAfter(today) ? "undo" : null}
                rightIconProps={{ onPress: _onResetDate, disabled: !moment(date).isAfter(today) }}
            />
            <Layout gray withHeader>
                <Header style={styles.header} contentStyle={styles.headerContent}>
                    <CalendarStrip selectedDate={date} datesWhitelist={whitelistDates} onDateSelected={_onSelectDate} />
                </Header>
                <BookingBanner data={data[vetIndex]} offset={offset} onPress={_onVetPopupOpen} />
                <Body style={styles.body} gray flex topRounded>
                    <Heading text="Appointment Time" />
                    <BookingTime
                        onSelect={_onSelectTime}
                        hidden={[0, 1, 2, 3, 4, 5, 6, 7, 22, 23]}
                        unavailable={[8, 9]}
                        selected={time}
                    />
                </Body>
            </Layout>

            <BookingModal data={data} open={vetPopup} onClose={_onVetPopupClose} onChoose={_onChoose} />
        </Container>
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
});
