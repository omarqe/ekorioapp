import React from "react";
import CT from "../../const.json";
import Fields from "../fields";
import Button from "../button";
import WaveForm from "../../../assets/wave-form.svg";
import PropTypes from "prop-types";
import { View, StyleSheet, ScrollView } from "react-native";

const LoginBody = ({ label }) => {
    const fields = [
        { type: "name", label: "Full Name", placeholder: "John Doe" },
        { type: "email", label: "Email Address", placeholder: "john@email.com" },
        { type: "password", label: "Password", placeholder: "••••••••" },
        { type: "phone", label: "Phone Number", placeholder: "+601234567890" },
    ];

    return (
        <View style={ss.container}>
            <WaveForm />
            <ScrollView style={ss.body}>
                <View style={ss.content}>
                    <Fields fields={fields} grouping />
                </View>
                <Button label={label} />
            </ScrollView>
        </View>
    );
};

LoginBody.propTypes = {
    label: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.object),
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
