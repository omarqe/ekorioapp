import React from "react";
import CT from "../../const.json";
import Field from "../field";
import Button from "../button";
import WaveForm from "../../../assets/wave-form.svg";
import PropTypes from "prop-types";
import { View, StyleSheet, ScrollView } from "react-native";

const LoginBody = ({ label }) => {
    return (
        <View style={ss.container}>
            <WaveForm />
            <ScrollView style={ss.body}>
                <View style={ss.content}>
                    <Field type="name" label="Full Name" placeholder="John Doe" />
                    <Field type="email" label="Email Address" placeholder="name@email.com" />
                    <Field type="phone" label="Phone Number" placeholder="+60 12-456 7890" />
                    <Field type="password" label="Password" placeholder="Password" last />
                </View>
                <Button label={label} />
            </ScrollView>
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
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: CT.BG_WHITE,
    },
    content: {
        marginBottom: 20,
    },
});

export default LoginBody;
