import React from "react";
import CT from "../const.json";
import Button from "../components/button";
import WaveForm from "../../assets/wave-form.svg";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const LoginBody = ({ label }) => {
    return (
        <View style={ss.container}>
            <WaveForm />
            <View style={ss.content}>
                <View style={ss.body}>
                    <Text>part2</Text>
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
    content: {
        padding: CT.LOGIN_CONTENT_PADDING,
        paddingBottom: 40,
        backgroundColor: CT.BG_WHITE,
    },
    body: {
        marginBottom: 20,
    },
});

export default LoginBody;
