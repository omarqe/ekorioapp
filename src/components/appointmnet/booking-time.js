import React, { useState } from "react";
import CT from "../../const";
import Text from "../text";
import PropTypes from "prop-types";
import { View, Pressable, StyleSheet } from "react-native";

import _range from "lodash/range";
import _numeral from "numeral";

const Time = ({ times, width = 90, onSelect, hidden = [], unavailable = [], selected = 0 }) => {
    return times.map((time, i) => {
        let itemStyle = [styles.time, { width }];
        let timeText = styles.timeText;
        let meridiemText = styles.meridiemText;

        const isSelected = selected === time;
        const isUnavailable = unavailable.indexOf(time) > -1;

        if (hidden.indexOf(time) > -1) {
            return null;
        } else if (isUnavailable) {
            timeText = [timeText, { color: CT.BG_GRAY_200 }];
            meridiemText = [meridiemText, { color: CT.BG_GRAY_200 }];
        } else if (isSelected) {
            timeText = [timeText, { color: CT.BG_PURPLE_400 }];
            itemStyle = [itemStyle, { borderColor: CT.BG_PURPLE_200, backgroundColor: CT.BG_PURPLE_50 }];
            meridiemText = [meridiemText, { color: CT.BG_PURPLE_300 }];
        }

        return (
            <Pressable
                key={i}
                style={itemStyle}
                onPressIn={typeof onSelect === "function" && !isUnavailable ? onSelect.bind(null, time) : null}
            >
                <Text style={timeText}>{_numeral(time).format("00.00").replace(".", ":")}</Text>
                <Text style={meridiemText}>{time < 12 ? "am" : "pm"}</Text>
            </Pressable>
        );
    });
};

export default function BookingTime({ onSelect, hidden, selected, unavailable }) {
    const _onLayout = (e) => setWidth(e?.nativeEvent?.layout?.width);

    const [width, setWidth] = useState(0);
    const unitw = (width - 3 * 4) / 4;
    const slots = [
        { title: "Morning Slots", times: _range(0, 12) },
        { title: "Evening Slots", times: _range(12, 24) },
    ];

    return (
        <View onLayout={_onLayout}>
            {slots.map(({ title, times }, i) => (
                <View key={i} style={{ marginBottom: i < slots.length - 1 ? 10 : 0 }}>
                    <Text style={styles.groupText}>{title}</Text>
                    <View style={styles.slots}>
                        <Time
                            onSelect={onSelect}
                            times={times}
                            width={unitw}
                            hidden={hidden}
                            selected={selected}
                            unavailable={unavailable}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    groupText: {
        color: CT.BG_GRAY_300,
        fontSize: 10,
        fontWeight: "500",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    slots: {
        flexWrap: "wrap",
        flexDirection: "row",
        marginHorizontal: -2,
    },
    icon: {
        top: -1,
        color: CT.BG_GRAY_200,
        marginRight: 3,
    },
    time: {
        padding: 10,
        marginBottom: 4,
        marginHorizontal: 2,

        borderWidth: 1,
        borderColor: CT.BG_GRAY_100,
        borderRadius: 10,
        backgroundColor: CT.BG_WHITE,

        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
        ...CT.SHADOW_SM,
    },
    timeText: {
        color: CT.BG_GRAY_600,
        fontSize: 12,
        fontWeight: "600",
    },
    meridiemText: {
        color: CT.BG_GRAY_300,
        fontSize: 12,
        marginLeft: 1,
    },
});

BookingTime.propTypes = {
    onSelect: PropTypes.func,
    hidden: PropTypes.array,
    selected: PropTypes.number,
    available: PropTypes.array,
};
