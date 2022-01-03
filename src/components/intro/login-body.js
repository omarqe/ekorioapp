import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import CT from "../../const.js";
import Text from "../text";
import Fields from "../fields";
import Button from "../button";
import Context from "../context";
import WaveForm from "../../../assets/wave-form.svg";
import PropTypes from "prop-types";

const LoginBody = ({ label, fields = [], forgot = false, onToggleForgot, withForgotFacility = false }) => {
    const context = useContext(Context.Login);
    const { fields: fieldsContext, loading, onChange, onSubmit, grouping = false } = context;
    if (fieldsContext !== undefined && typeof fieldsContext === "object") {
        fields = fieldsContext;
    }

    return (
        <View style={styles.container}>
            <WaveForm />
            <View style={styles.body}>
                <View style={styles.content}>
                    <Fields fields={fields} disabled={loading} grouping={grouping} onChange={onChange} />
                    {withForgotFacility && !forgot && (
                        <View style={styles.forgotContainer}>
                            <TouchableOpacity style={styles.forgotBtn} onPress={onToggleForgot} disabled={loading}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Button text={label} color="yellow" onPress={onSubmit} loading={loading} />
                {withForgotFacility && forgot && !loading && (
                    <View style={styles.forgotCancelContainer}>
                        <TouchableOpacity style={styles.forgotCancelBtn} onPress={onToggleForgot}>
                            <Text style={styles.forgotCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        paddingBottom: 20,
        backgroundColor: CT.BG_WHITE,
    },
    content: {
        marginBottom: 20,
    },
    forgotContainer: {
        alignItems: "flex-end",
    },
    forgotBtn: {
        padding: 5,
        marginRight: -5,
        marginBottom: -5,
    },
    forgotText: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
    },
    forgotCancelContainer: {
        paddingTop: 5,
        alignItems: "center",
    },
    forgotCancelBtn: {
        padding: 5,
    },
    forgotCancelText: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});

export default LoginBody;
