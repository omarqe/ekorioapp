import React, { useContext } from "react";
import CT from "../../const.json";
import Context from "../context";
import ButtonOrb from "../button-orb";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const LoginHeader = ({ title, subtitle, keyboardShown }) => {
    const { navigation, swapTitle } = useContext(Context.Login);
    const goBack = () => navigation?.goBack();
    const doSwapTitle = swapTitle && keyboardShown;

    return (
        <React.Fragment>
            <View style={ss.top}>
                <ButtonOrb icon="arrow-left" style={{ marginLeft: -10 }} onPress={goBack} />
                {doSwapTitle && (
                    <View style={ss.topTitle}>
                        <Text style={ss.topHeadingTitle}>{title}</Text>
                        <Text style={ss.topHeadingSubtitle}>{subtitle}</Text>
                    </View>
                )}
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
    keyboardShown: PropTypes.bool,
};

const ss = StyleSheet.create({
    top: {
        width: "100%",
        height: 50,
        zIndex: 10,
        paddingTop: 10,
        paddingLeft: CT.LOGIN_CONTENT_PADDING,
        paddingRight: CT.LOGIN_CONTENT_PADDING,

        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    topTitle: {
        marginLeft: 10,
    },
    topHeadingTitle: {
        color: CT.BG_WHITE,
        fontSize: 20,
        fontWeight: "600",
    },
    topHeadingSubtitle: {
        color: CT.BG_PURPLE_300,
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
