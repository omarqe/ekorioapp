import React from "react";
import CT from "../const.json";
import ButtonOrb from "./button-orb";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const LoginHeader = ({ nav, title, subtitle }) => {
    const goBack = () => nav.goBack();
    return (
        <React.Fragment>
            <View style={ss.top}>
                <ButtonOrb icon="arrow-left" style={{ marginLeft: -5 }} onPress={goBack} />
            </View>
            <View style={ss.header}>
                <Text style={ss.headingTitle}>{title}</Text>
                <Text style={ss.headingSubtitle}>{subtitle}</Text>
            </View>
        </React.Fragment>
    );
};

LoginHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

const ss = StyleSheet.create({
    top: {
        width: "100%",
        height: 50,
        paddingTop: 10,
        paddingLeft: CT.LOGIN_CONTENT_PADDING,
        paddingRight: CT.LOGIN_CONTENT_PADDING,
    },
    header: {
        flex: 1,
        padding: CT.LOGIN_CONTENT_PADDING,
        marginBottom: "auto",
        justifyContent: "center",
    },
    headingTitle: {
        color: CT.BG_WHITE,
        fontSize: 28,
        fontWeight: "700",
        paddingBottom: 2,
    },
    headingSubtitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 16,
        fontWeight: "500",
    },
});

export default LoginHeader;
