import React, { useContext } from "react";
import CT from "../../const.js";
import Text from "../text";
import Context from "../context";
import ButtonIcon from "../button-icon";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const LoginHeader = ({ title, subtitle, keyboardShown }) => {
    const { navigation, swapTitle } = useContext(Context.Login);
    const goBack = () => navigation?.goBack();
    const doSwapTitle = swapTitle && keyboardShown;

    return (
        <React.Fragment>
            <View style={styles.top}>
                <ButtonIcon icon="arrow-left" style={{ marginLeft: -10 }} onPress={goBack} />
                {doSwapTitle && (
                    <View style={styles.topTitle}>
                        <Text style={styles.topHeadingTitle}>{title}</Text>
                        <Text style={styles.topHeadingSubtitle}>{subtitle}</Text>
                    </View>
                )}
            </View>
            <View style={styles.header}>
                <Text style={styles.headingTitle}>{title}</Text>
                <Text style={styles.headingSubtitle}>{subtitle}</Text>
            </View>
        </React.Fragment>
    );
};

LoginHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    keyboardShown: PropTypes.bool,
};

const styles = StyleSheet.create({
    top: {
        width: "100%",
        height: 50,
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
        fontSize: 16,
        fontWeight: "600",
    },
    topHeadingSubtitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 12,
    },
    header: {
        flex: 1,
        padding: CT.LOGIN_CONTENT_PADDING,
        marginBottom: "auto",
        justifyContent: "center",
    },
    headingTitle: {
        color: CT.BG_WHITE,
        fontSize: 24,
        fontWeight: "700",
        paddingBottom: 2,
    },
    headingSubtitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 14,
        fontWeight: "500",
    },
});

export default LoginHeader;
