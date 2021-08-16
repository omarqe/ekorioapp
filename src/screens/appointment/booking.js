import React, { useState, useEffect } from "react";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import CalendarStrip from "../../components/calendar-strip";

import { StyleSheet } from "react-native";

import moment from "moment";

export default function AppointmentBookingScreen({ navigation }) {
    const today = moment().toDate();
    const datesWhitelist = [{ start: moment(), end: moment().add(1, "years") }];

    const [date, setDate] = useState(today);
    const _onResetDate = () => setDate(today);
    const _onDateSelected = (date) => setDate(moment(date));

    return (
        <Container>
            <TopBar
                title="Book Appointment"
                leftIcon="arrow-left"
                leftIconProps={{ onPress: navigation.goBack }}
                rightIcon={moment(date).isAfter(today) ? "undo" : null}
                rightIconProps={{ onPress: _onResetDate, disabled: !moment(date).isAfter(today) }}
            />
            <Layout gray withHeader>
                <Header contentStyle={styles.headerContent}>
                    <CalendarStrip datesWhitelist={datesWhitelist} selectedDate={date} onDateSelected={_onDateSelected} />
                </Header>
                <Body gray flex topRounded></Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
});
