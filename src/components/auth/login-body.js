import React, { useContext } from "react";
import CT from "../../const.json";
import Fields from "../fields";
import Button from "../button";
import Context from "../context";
import WaveForm from "../../../assets/wave-form.svg";
import PropTypes from "prop-types";
import { View, StyleSheet, ScrollView } from "react-native";

const LoginBody = ({ label, fields = [] }) => {
    const ctx = useContext(Context.Login);
    if (ctx?.fields !== undefined) {
        fields = ctx.fields;
    }

    return (
        <View style={ss.container}>
            <WaveForm />
            <ScrollView style={ss.body} keyboardShouldPersistTaps="handled">
                <View style={ss.content}>
                    <Fields fields={fields} />
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
