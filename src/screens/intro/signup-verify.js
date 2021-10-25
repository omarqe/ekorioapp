import React, { useRef, useState, useEffect, useContext } from "react";
import CT from "../../const.js";
import Text from "../../components/text";
import Context from "../../components/context";
import OTPIcon from "../../../assets/arts/otp-icon.svg";
import Container from "../../components/container";
import ButtonIcon from "../../components/button-icon";
import KeyboardAvoiding from "../../components/keyboard-avoiding";
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import store from "../../functions/store";
import _times from "lodash/times";

export default function SignupVerifyScreen({ route, navigation }) {
    const [otp, setOTP] = useState("");
    const [sec, setSec] = useState(CT.LOGIN_OTP_TIMEOUT);
    const [requestID, setRequestID] = useState(null);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const auth = useContext(Context.Auth);
    const resendDisabled = sec > 0;
    const { uid, cc, phone, token } = route?.params || {};

    const goBack = () => navigation.goBack();
    const onFocus = () => ref?.current?.focus();
    const onChangeOTP = (otp) => {
        setOTP(otp);
        if (otp?.length >= 6) {
            if (!loading) {
                setLoading(true);
                http.post("/otp/verify_otp", net.data({ uid, code: otp, request_id: requestID }))
                    .then((o) => {
                        setLoading(false);
                        const { data } = o;
                        if (!data?.success) {
                            toast.fromData(data, "response[0].message");
                            return;
                        }

                        auth.setAuthed(true);
                        store.save("token", token);
                        store.save("uid", uid?.toString());
                    })
                    .catch(({ response }) => {
                        setOTP("");
                        net.handleCatch(response, setLoading);
                    });
            }
        }
    };
    const requestOTP = (cc, phone) => {
        http.post("/otp/request_otp", net.data({ cc, phone }))
            .then((o) => {
                setLoading(false);
                const { data } = o;
                const { payload } = data;
                if (!data?.success) {
                    toast.fromData(data, "response[0].message");
                    return;
                }

                setRequestID(payload?.request_id);
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    };
    const resendOTP = () => {
        if (!resendDisabled) {
            setOTP("");
            setSec(CT.LOGIN_OTP_TIMEOUT);
            requestOTP(cc, phone);
        }
    };

    // When screen was rendered for the first time, request an OTP to the phone number
    useEffect(() => requestOTP(cc, phone), []);

    // Resend OTP timer
    useEffect(() => {
        const timer = sec > 0 && setInterval(() => setSec(sec - 1), 1000);
        return () => clearInterval(timer);
    }, [sec]);

    return (
        <Container
            paddingX={25}
            statusBarStyle="dark"
            safeTop="light"
            loading={loading}
            spinnerBoxStyle={styles.spinnerBoxStyle}
            isLogin
        >
            <View style={styles.top}>
                <ButtonIcon icon="arrow-left" onPress={goBack} inverted />
            </View>
            <KeyboardAvoiding style={styles.body}>
                <OTPIcon />
                <View style={styles.description}>
                    <Text style={styles.heading}>Please enter verification code</Text>
                    <Text style={styles.subtitle}>We've sent verification code to:</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.subtitlePhone}>
                            +{cc} {phone}
                        </Text>
                        <TouchableOpacity onPress={navigation.goBack}>
                            <Text style={styles.subtitleWrongNumber}>(Wrong number?)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onFocus}>
                    <View style={styles.otpContainer}>
                        {_times(6, (n) => {
                            const digit = otp[n] !== undefined ? otp[n] : null;
                            const hasDigit = digit !== null;
                            const digitStyle = { ...styles.otpDigit, color: hasDigit ? CT.BG_GRAY_900 : CT.BG_GRAY_200 };

                            return (
                                <React.Fragment key={n}>
                                    <Text style={digitStyle}>{digit ?? "-"}</Text>
                                    {n === 2 && <View style={{ width: 5 }} />}
                                </React.Fragment>
                            );
                        })}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={styles.ctaNotReceive}>Didn't receive the code?</Text>
                    <TouchableOpacity onPress={resendOTP} disabled={resendDisabled}>
                        <Text style={{ ...styles.ctaResend, opacity: resendDisabled ? 0.3 : 1 }}>
                            {resendDisabled ? `RESEND IN ${sec}s` : "RESEND CODE"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    ref={ref}
                    value={otp}
                    style={styles.inputStyle}
                    onChangeText={onChangeOTP}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoFocus
                />
            </KeyboardAvoiding>
        </Container>
    );
}

const styles = StyleSheet.create({
    description: {
        marginTop: 15,
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        color: CT.BG_GRAY_400,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 4,
    },
    subtitlePhone: {
        color: CT.BG_GRAY_500,
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center",
    },
    subtitleWrongNumber: {
        color: CT.CTA_NEUTRAL,
        fontSize: 12,
        marginLeft: 3,
    },
    spinnerBoxStyle: {
        marginTop: "-50%",
    },

    otpContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 35,
        marginBottom: 25,
    },
    otpDigit: {
        width: 22,
        fontSize: 32,
        textAlign: "center",
        fontWeight: "700",
    },

    ctaNotReceive: {
        color: CT.BG_GRAY_500,
        padding: 10,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
    ctaResend: {
        color: CT.CTA_NEUTRAL,
        padding: 10,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "700",
    },

    top: {
        width: "100%",
        height: 50,
        paddingTop: 10,
    },
    body: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    inputStyle: {
        width: CT.IS_ANDROID ? 50 : 0,
        height: CT.IS_ANDROID ? 50 : 0,
        color: CT.BG_WHITE,
        left: -CT.SCREEN_WIDTH,
        position: "absolute",
        backgroundColor: CT.BG_WHITE,
    },
});
