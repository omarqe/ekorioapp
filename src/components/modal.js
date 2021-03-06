import React from "react";
import CT from "../const";
import Heading from "./heading";
import ButtonIcon from "./button-icon";

import RNModal from "react-native-modal";
import PropTypes from "prop-types";
import { View, SafeAreaView, StyleSheet } from "react-native";
export default function Modal({
    title,
    kicker,
    badge,
    subtitle,
    children,
    headerChildren,
    headingSize = 1,
    open = false,
    onClose = null,
    onToggle = null,
    style = {},
    contentStyle = {},
    safeAreaStyle = {},
    theme: themeColor = "white",
    headerStyle: customHeaderStyle = {},
    ...restProps
}) {
    const purple = CT.BG_PURPLE_800;
    const themes = {
        purple: {
            body: { backgroundColor: purple },
            safeArea: { backgroundColor: style?.backgroundColor ?? purple },
            headerStyle: { paddingTop: 30, paddingBottom: 30, backgroundColor: purple, marginTop: -2 },
            headingText: { color: CT.BG_WHITE },
            closeBtnInner: { backgroundColor: CT.BG_PURPLE_500 },
            closeBtnIconColor: CT.BG_PURPLE_300,
            backdropColor: CT.BG_PURPLE_900,
            backdropOpacity: 0.7,
        },
        white: {
            body: {},
            safeArea: { backgroundColor: style.backgroundColor ?? CT.BG_WHITE },
            headerStyle: {},
            headingText: {},
            closeBtnInner: {},
            closeBtnIconColor: CT.BG_GRAY_400,
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

    const headerStyle = {
        ...theme.headerStyle,
        ...customHeaderStyle,
    };

    return (
        <RNModal
            style={styles.modal}
            isVisible={open}
            animationIn="fadeInUp"
            useNativeDriverForBackdrop
            {...backdrop}
            {...restProps}
        >
            <SafeAreaView style={{ ...styles.safeArea, ...theme?.safeArea, ...safeAreaStyle }}>
                <View style={{ ...styles.body, ...theme?.body, ...style }}>
                    <View style={{ ...styles.header, ...headerStyle }}>
                        <View style={styles.headerTitle}>
                            <Heading
                                size={headingSize}
                                text={title}
                                badge={badge}
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
                        {headerChildren && <View style={styles.headerContent}>{headerChildren}</View>}
                    </View>
                    <View style={[styles.content, contentStyle]}>{children}</View>
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
        backgroundColor: CT.BG_WHITE,
        borderTopLeftRadius: CT.BODY_RADIUS,
        borderTopRightRadius: CT.BODY_RADIUS,
    },
    header: {
        position: "relative",
        padding: 25,
        paddingBottom: 0,
        borderTopLeftRadius: CT.BODY_RADIUS,
        borderTopRightRadius: CT.BODY_RADIUS,
    },
    headerContent: {
        paddingTop: 25,
    },
    heading: {
        marginRight: "auto",
    },
    content: {
        padding: 25,
    },
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
    badge: PropTypes.object,
    title: PropTypes.string,
    kicker: PropTypes.string,
    subtitle: PropTypes.string,
    headerChildren: PropTypes.node,
    headingSize: PropTypes.number,

    open: PropTypes.bool,
    theme: PropTypes.oneOf(["white", "purple"]),
    onClose: PropTypes.func,
    onToggle: PropTypes.func,

    style: PropTypes.object,
    headerStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    safeAreaStyle: PropTypes.object,
};
