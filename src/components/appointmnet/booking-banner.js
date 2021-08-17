import React, { useState } from "react";
import CT from "../../const";

import Banner from "../banner";
import Heading from "../heading";
import ButtonIcon from "../button-icon";
import PropTypes from "prop-types";

import { View, Pressable, StyleSheet } from "react-native";

export default function BookingBanner({ data, offset, onPress }) {
    const [pressed, setPressed] = useState(false);
    const bannerStyle = pressed ? { transform: [{ translateY: 1.5 }] } : {};

    const _onTogglePressed = () => setPressed(!pressed);

    return (
        <View style={[styles.bannerContainer, { marginBottom: -offset }]}>
            <Pressable onPress={onPress} onPressIn={_onTogglePressed} onPressOut={_onTogglePressed}>
                <Banner style={bannerStyle} contentStyle={styles.bannerContent}>
                    <Heading
                        style={styles.heading}
                        textStyle={{ color: data?.text ? CT.BG_GRAY_800 : CT.BG_GRAY_500 }}
                        kicker="Your veterinarian:"
                        text={data?.text ?? "Please select a veterinar"}
                        gapless
                    />
                    <ButtonIcon
                        icon="map-marker-alt"
                        weight="fas"
                        onPress={onPress}
                        onPressIn={_onTogglePressed}
                        onPressOut={_onTogglePressed}
                        iconProps={{ color: data?.text ? CT.CTA_NEGATIVE : CT.BG_PURPLE_200 }}
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
};
