import React from "react";
import PropTypes from "prop-types";
import LoginBody from "./login-body";
import LoginHeader from "./login-header";
import StarsBackdrop from "../stars-backdrop";
import { View, StyleSheet } from "react-native";

const LoginComponent = ({ nav, title, subtitle, btnLabel }) => {
    return (
        <React.Fragment>
            <StarsBackdrop />
            <View style={ss.container}>
                <LoginHeader nav={nav} title={title} subtitle={subtitle} />
                <LoginBody label={btnLabel} />
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
