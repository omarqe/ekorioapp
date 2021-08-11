import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LoginBody from "./login-body";
import LoginHeader from "./login-header";
import StarsBackdrop from "./stars-backdrop";
import { View, StyleSheet, Keyboard, KeyboardAvoidingView } from "react-native";

const LoginComponent = ({ title, subtitle, btnLabel }) => {
    const [keyboardShown, setKeyboardShown] = useState(false);
    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () => setKeyboardShown(true));
        const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () => setKeyboardShown(false));
        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    return (
        <React.Fragment>
            <StarsBackdrop />
            <View style={styles.container}>
                <LoginHeader title={title} subtitle={subtitle} keyboardShown={keyboardShown} />
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
});

export default LoginComponent;
