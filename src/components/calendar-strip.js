import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import RNCalendarStrip from "react-native-calendar-strip";
import { View, StyleSheet } from "react-native";

export default function CalendarStrip(props) {
    return (
        <View style={styles.base}>
            <RNCalendarStrip
                scrollable
                scrollerPaging
                style={styles.calendar}
                dateNumberStyle={styles.dateNumber}
                dateNameStyle={styles.dateName}
                iconContainer={styles.iconContainer}
                iconLeft={require("../../assets/icons/chevron-left.png")}
                iconLeftStyle={styles.chevrons}
                iconRight={require("../../assets/icons/chevron-right.png")}
                iconRightStyle={styles.chevrons}
                calendarColor={CT.BG_PURPLE_900}
                calendarHeaderStyle={styles.calendarHeader}
                highlightDateNameStyle={styles.highlightDateName}
                highlightDateNumberStyle={styles.highlightDateNumber}
                highlightDateContainerStyle={styles.highlightDateContainer}
                {...props}
            />
        </View>
    );
}

const dateName = { fontSize: 11, marginTop: 2 };
const dateNumber = { fontSize: 22, marginTop: 0, paddingTop: 0 };
const calendarHeaderMargin = 20;
const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    iconContainer: {
        flex: 0.1,
    },
    calendar: {
        paddingTop: 0,
        paddingBottom: calendarHeaderMargin * 0.6,
    },
    calendarHeader: {
        color: CT.BG_PURPLE_400,
        fontSize: 16,
        fontWeight: "500",
        marginBottom: calendarHeaderMargin,
    },
    dateName: {
        color: CT.BG_PURPLE_400,
        ...dateName,
    },
    dateNumber: {
        color: CT.BG_PURPLE_300,
        fontWeight: "700",
        ...dateNumber,
    },
    chevrons: {
        width: 30,
        height: 30,
        marginTop: 15,
    },
    highlightDateName: {
        color: CT.BG_PURPLE_300,
        ...dateName,
    },
    highlightDateNumber: {
        color: CT.BG_PURPLE_100,
        ...dateNumber,
    },
    highlightDateContainer: {
        backgroundColor: CT.BG_PURPLE_700,
    },
});

CalendarStrip.propTypes = {
    scrollable: PropTypes.bool,
    scrollerPaging: PropTypes.bool,
};
