import React, { useState } from "react";
import CT from "../../const";

import Banner from "../banner";
import Heading from "../heading";
import ButtonIcon from "../button-icon";
import PropTypes from "prop-types";

import { View, Pressable, StyleSheet } from "react-native";

export default function BookingBanner({ data, offset, onPress, loading = false }) {
    const [pressed, setPressed] = useState(false);
    const bannerStyle = pressed ? { transform: [{ translateY: 1.5 }] } : {};

    const isPressable = typeof onPress === "function" && !loading;
    const _onTogglePressed = () => {
        if (isPressable) setPressed(!pressed);
    };
    const _onPress = () => {
        if (isPressable) onPress();
    };

    return (
        <View style={[styles.bannerContainer, { marginBottom: -offset }]}>
            <Pressable onPress={_onPress} onPressIn={_onTogglePressed} onPressOut={_onTogglePressed}>
                <Banner style={bannerStyle} contentStyle={styles.bannerContent}>
                    <Heading
                        style={styles.heading}
                        textStyle={{ color: data?.name ? CT.BG_GRAY_800 : CT.BG_GRAY_200, marginTop: 2 }}
                        kicker="Your appointment at:"
                        text={data?.name ?? "Please select a vet.."}
                        gapless
                    />
                    <ButtonIcon
                        icon="map-marker-alt"
                        weight="fas"
                        onPress={_onPress}
                        onPressIn={_onTogglePressed}
                        onPressOut={_onTogglePressed}
                        iconProps={{ color: CT.CTA_NEGATIVE }}
                        inverted
                    />
                </Banner>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        marginRight: "auto",
    },
    bannerContent: {
        flexDirection: "row",
    },
    bannerContainer: {
        zIndex: 90,
        position: "relative",
        paddingTop: 20,
        paddingHorizontal: 15,
    },
});

BookingBanner.propTypes = {
    data: PropTypes.object,
    offset: PropTypes.number,
    onPress: PropTypes.func,
    loading: PropTypes.bool,
};
