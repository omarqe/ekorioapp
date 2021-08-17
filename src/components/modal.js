import React from "react";
import CT from "../const";
import Heading from "./heading";
import ButtonIcon from "./button-icon";

import RNModal from "react-native-modal";
import PropTypes from "prop-types";
import { View, SafeAreaView, StyleSheet } from "react-native";

export default function Modal(props) {
    const { title, kicker, subtitle, children } = props;
    const { open = false, theme: themeColor = "white", onClose = null, onToggle = null } = props;

    const purple = CT.BG_PURPLE_900;
    const themes = {
        purple: {
            body: { backgroundColor: purple },
            safeArea: { backgroundColor: purple },
            headingText: { color: CT.BG_PURPLE_100 },
            closeBtnInner: { backgroundColor: CT.BG_PURPLE_700 },
            closeBtnIconColor: CT.BG_PURPLE_400,
            backdropColor: CT.BG_PURPLE_X,
            backdropOpacity: 0.6,
        },
        white: {
            body: {},
            safeArea: {},
            headingText: {},
            closeBtnInner: {},
            closeBtnIconColor: null,
            backdropColor: CT.BG_PURPLE_900,
            backdropOpacity: 0.9,
        },
    };
    const theme = themes[themeColor];
    const backdrop = {
        backdropColor: theme?.backdropColor,
        backdropOpacity: theme?.backdropOpacity,
        onBackdropPress: onClose ?? onToggle,
    };

    return (
        <RNModal style={styles.modal} isVisible={open} animationIn="fadeInUp" {...backdrop}>
            <SafeAreaView style={{ ...styles.safeArea, ...theme?.safeArea }}>
                <View style={{ ...styles.body, ...theme?.body }}>
                    <View style={[styles.header, { alignItems: kicker || subtitle ? "flex-start" : "center" }]}>
                        <Heading
                            size={1}
                            text={title}
                            kicker={kicker}
                            subtitle={subtitle}
                            textStyle={theme?.headingText}
                            style={styles.heading}
                            gapless
                        />
                        <ButtonIcon
                            onPress={onClose ?? onToggle}
                            icon="times"
                            style={styles.closeBtn}
                            innerStyle={{ ...styles.closeBtnInner, ...theme?.closeBtnInner }}
                            iconProps={{ size: 16, color: theme?.closeBtnIconColor }}
                            inverted
                        />
                    </View>
                    <View style={styles.content}>{children}</View>
                </View>
            </SafeAreaView>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    safeArea: {
        backgroundColor: CT.BG_WHITE,
        borderTopLeftRadius: CT.BODY_RADIUS,
        borderTopRightRadius: CT.BODY_RADIUS,
    },
    body: {
        position: "relative",
        padding: 25,
        backgroundColor: CT.BG_WHITE,
        borderTopLeftRadius: CT.BODY_RADIUS,
        borderTopRightRadius: CT.BODY_RADIUS,
    },
    header: {
        display: "flex",
        position: "relative",
        alignItems: "flex-start",
        marginBottom: 20,
        flexDirection: "row",
    },
    heading: {
        marginRight: "auto",
    },
    content: {},
    closeBtn: {
        top: 0,
        right: 0,
        width: 55,
        height: 55,
        position: "absolute",
    },
    closeBtnInner: {
        padding: 2,
        width: 25,
        height: 25,
        marginTop: -30,
        marginRight: -30,
        borderRadius: 27,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CT.BG_GRAY_100,
    },
});

Modal.propTypes = {
    title: PropTypes.string,
    kicker: PropTypes.string,
    subtitle: PropTypes.string,

    open: PropTypes.bool,
    theme: PropTypes.oneOf(["white", "purple"]),
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
};
