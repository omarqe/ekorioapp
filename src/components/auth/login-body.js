import React from "react";
import CT from "../../const.json";
import Button from "../button";
import WaveForm from "../../../assets/wave-form.svg";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const LoginBody = ({ label }) => {
    return (
        <View style={ss.container}>
            <WaveForm />
            <View style={ss.body}>
                <View style={ss.content}>
                    <Text>Part 2</Text>
                </View>
                <Button label={label} />
            </View>
        </View>
    );
};

LoginBody.propTypes = {
    label: PropTypes.string,
};

const ss = StyleSheet.create({
    container: {
        position: "relative",
    },
    body: {
        padding: CT.LOGIN_CONTENT_PADDING,
        paddingTop: 50,
        paddingBottom: 40,
        backgroundColor: CT.BG_WHITE,
    },
    content: {
        marginBottom: 20,
    },
});

export default LoginBody;
