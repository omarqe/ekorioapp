import React from "react";
import CT from "../const";
import PropTypes from "prop-types";
import RNCalendarStrip from "react-native-calendar-strip";
import { View, StyleSheet } from "react-native";

export default function CalendarStrip(props) {
    const lowRes = CT.PIXELRATIO < 3 || CT.SCREEN_WIDTH < 400;
    const text = [
        { nameStyle: { fontSize: 11, marginTop: 2 }, numberStyle: { fontSize: 22, marginTop: 0, paddingTop: 0 } },
        { nameStyle: { fontSize: 9, marginTop: 2 }, numberStyle: { fontSize: 18, marginTop: 0, paddingTop: 0 } },
    ];

    const dateNameStyle = text[lowRes ? 1 : 0].nameStyle;
    const dateNumberStyle = text[lowRes ? 1 : 0].numberStyle;

    return (
        <View style={styles.base}>
            <RNCalendarStrip
                scrollable
                scrollerPaging
                style={styles.calendar}
                iconContainer={styles.iconContainer}
                iconLeft={require("../../assets/icons/chevron-left.png")}
                iconLeftStyle={styles.chevrons}
                iconRight={require("../../assets/icons/chevron-right.png")}
                iconRightStyle={styles.chevrons}
                calendarColor={CT.BG_PURPLE_900}
                calendarHeaderStyle={styles.calendarHeader}
                disabledDateOpacity={0.5}
                //
                dateNameStyle={[styles.dateName, dateNameStyle]}
                dateNumberStyle={[styles.dateNumber, dateNumberStyle]}
                disabledDateNameStyle={[styles.disabledDateName, dateNameStyle]}
                disabledDateNumberStyle={[styles.disabledDateNumber, dateNumberStyle]}
                highlightDateNameStyle={[styles.highlightDateName, dateNameStyle]}
                highlightDateNumberStyle={[styles.highlightDateNumber, dateNumberStyle]}
                //
                highlightDateContainerStyle={styles.highlightDateContainer}
                daySelectionAnimation={{ type: "background", duration: 100 }}
                {...props}
            />
        </View>
    );
}

const calendarHeaderMargin = 25;
const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    iconContainer: {
        flex: 0.1,
    },
    calendar: {
        paddingTop: 0,
        paddingBottom: calendarHeaderMargin * 0.7,
    },
    calendarHeader: {
        color: CT.BG_PURPLE_400,
        fontSize: 16,
        fontWeight: "500",
        marginBottom: calendarHeaderMargin,
    },
    dateName: {
        color: CT.BG_PURPLE_400,
    },
    dateNumber: {
        color: CT.BG_PURPLE_300,
        fontWeight: "700",
    },
    chevrons: {
        width: 30,
        height: 30,
        marginTop: 25,
    },
    disabledDateName: {
        color: CT.BG_PURPLE_500,
    },
    disabledDateNumber: {
        color: CT.BG_PURPLE_400,
    },
    highlightDateName: {
        color: CT.BG_PURPLE_300,
    },
    highlightDateNumber: {
        color: CT.BG_PURPLE_100,
    },
    highlightDateContainer: {
        backgroundColor: CT.BG_PURPLE_700,
    },
});

CalendarStrip.propTypes = {
    scrollable: PropTypes.bool,
    scrollerPaging: PropTypes.bool,
};
