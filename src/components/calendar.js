import React from "react";
import CT from "../const";
import Icon from "./icon";
import PropTypes from "prop-types";
import CalendarPicker from "react-native-calendar-picker";
import { View, StyleSheet } from "react-native";

export default function Calendar(props) {
    const EarButton = ({ next = false }) => {
        const icon = next ? "chevron-right" : "chevron-left";
        const style = next ? { marginLeft: 2 } : { marginRight: 2 };

        return (
            <View style={styles.earButton}>
                <Icon icon={`fas ${icon}`} size={14} color={CT.BG_PURPLE_300} style={style} />
            </View>
        );
    };

    return (
        <CalendarPicker
            nextComponent={<EarButton next />}
            previousComponent={<EarButton />}
            textStyle={styles.text}
            yearTitleStyle={styles.yearTitle}
            monthTitleStyle={styles.monthTitle}
            todayTextStyle={styles.todayText}
            todayBackgroundColor={CT.BG_PURPLE_900}
            selectedDayStyle={styles.selectedDay}
            selectedDayTextStyle={styles.selectedDayText}
            selectedRangeStyle={styles.selectedRange}
            disabledDatesTextStyle={styles.disabledDatesText}
            dayLabelsWrapper={styles.dayLabel}
            headerWrapperStyle={styles.headerWrapper}
            {...props}
        />
    );
}

const calPadding = 18;
const styles = StyleSheet.create({
    earButton: {
        width: 26,
        height: 26,
        borderRadius: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CT.BG_PURPLE_600,
        ...CT.SHADOW_MD,
    },

    headerWrapper: {
        paddingLeft: calPadding,
        paddingRight: calPadding,
    },
    dayLabel: {
        borderWidth: 0,
        borderColor: CT.BG_PURPLE_900,
    },
    text: {
        color: CT.BG_PURPLE_400,
        fontSize: 18,
    },
    todayText: {
        color: CT.BG_PURPLE_200,
        fontWeight: "700",
    },
    selectedDay: {
        backgroundColor: CT.BG_PURPLE_600,
        ...CT.GLOW_PURPLE,
    },
    selectedDayText: {
        color: CT.BG_PURPLE_200,
        fontWeight: "700",
    },
    selectedRange: {
        ...CT.SHADOW_SM,
        backgroundColor: CT.BG_PURPLE_600,
    },
    monthTitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 18,
        fontWeight: "700",
    },
    yearTitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 18,
        fontWeight: "700",
    },
    disabledDatesText: {
        color: CT.BG_PURPLE_600,
    },
});

Calendar.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    showDayStragglers: PropTypes.bool,
};
