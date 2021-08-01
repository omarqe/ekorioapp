import React from "react";
import PropTypes from "prop-types";
import LoginBody from "./login-body";
import LoginHeader from "./login-header";
import StarsBackdrop from "../stars-backdrop";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

const LoginComponent = ({ nav, title, subtitle, btnLabel }) => {
    return (
        <React.Fragment>
            <StarsBackdrop />
            <View style={ss.container}>
                <LoginHeader nav={nav} title={title} subtitle={subtitle} />
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
                    <LoginBody label={btnLabel} />
                </KeyboardAvoidingView>
            </View>
        </React.Fragment>
    );
};

LoginComponent.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    btnLabel: PropTypes.string,
};

const ss = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
});

export default LoginComponent;
