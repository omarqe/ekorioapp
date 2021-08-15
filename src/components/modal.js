import React from "react";
import CT from "../const";
import Heading from "./heading";
import ButtonIcon from "./button-icon";

import RNModal from "react-native-modal";
import PropTypes from "prop-types";
import { View, SafeAreaView, StyleSheet } from "react-native";

export default function Modal({ title, kicker, subtitle, children, onClose = null, onToggle = null, shown = false }) {
    return (
        <RNModal
            style={styles.modal}
            isVisible={shown}
            animationIn="fadeInUp"
            onBackdropPress={onClose ?? onToggle}
            animationOutTiming={1000}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.body}>
                    <View style={[styles.header, { alignItems: kicker || subtitle ? "flex-start" : "center" }]}>
                        <Heading style={styles.heading} size={1} text={title} kicker={kicker} subtitle={subtitle} gapless />
                        <ButtonIcon
                            onPress={onClose ?? onToggle}
                            icon="times"
                            style={styles.closeBtn}
                            innerStyle={styles.closeBtnInner}
                            iconProps={{ size: 16 }}
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
    shown: PropTypes.bool,
    title: PropTypes.string,
    kicker: PropTypes.string,
    subtitle: PropTypes.string,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
};
