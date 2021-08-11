import React, { useContext } from "react";
import CT from "../../const.js";
import Fields from "../fields";
import Button from "../button";
import Context from "../context";
import WaveForm from "../../../assets/wave-form.svg";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const LoginBody = ({ label, fields = [] }) => {
    const context = useContext(Context.Login);
    const { fields: fieldsContext, onSubmit, grouping = false } = context;
    if (fieldsContext !== undefined && typeof fieldsContext === "object") {
        fields = fieldsContext;
    }

    return (
        <View style={styles.container}>
            <WaveForm />
            <View style={styles.body}>
                <View style={styles.content}>
                    <Fields fields={fields} grouping={grouping} />
                </View>
                <Button label={label} onPress={onSubmit} />
            </View>
        </View>
    );
};

LoginBody.propTypes = {
    label: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.object),
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    body: {
        padding: CT.LOGIN_CONTENT_PADDING,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: CT.BG_WHITE,
    },
    content: {
        marginBottom: 20,
    },
});

export default LoginBody;
