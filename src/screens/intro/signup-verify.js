import React, { useEffect, useRef, useState } from "react";
import CT from "../../const.json";
import OTPIcon from "../../../assets/arts/otp-icon.svg";
import Container from "../../components/container";
import ButtonOrb from "../../components/button-orb";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from "react-native";

import _times from "lodash/times";

export default function SignupVerifyScreen({ navigation }) {
    const [otp, setOTP] = useState("");
    const [sec, setSec] = useState(CT.LOGIN_OTP_TIMEOUT);
    const ref = useRef(null);
    const resendDisabled = sec > 0;
    const goBack = () => navigation.goBack();
    const onFocus = () => ref?.current?.focus();
    const onChangeOTP = (otp) => setOTP(otp);

    // Resend OTP timer
    useEffect(() => {
        const timer = sec > 0 && setInterval(() => setSec(sec - 1), 1000);
        return () => clearInterval(timer);
    }, [sec]);

    return (
        <Container>
            <View style={ss.top}>
                <ButtonOrb icon="arrow-left" onPress={goBack} inverted />
            </View>
            <KeyboardAvoidingView style={ss.body} behavior="padding">
                <OTPIcon />
                <View style={ss.description}>
                    <Text style={ss.heading}>Please enter verification code</Text>
                    <Text style={ss.subtitle}>We've sent verification code to:</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={ss.subtitlePhone}>+60 12-345 6789</Text>
                        <TouchableOpacity>
                            <Text style={ss.subtitleWrongNumber}>(Wrong number?)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onFocus}>
                    <View style={ss.otpContainer}>
                        {_times(6, (n, key) => {
                            const digit = otp[n] !== undefined ? otp[n] : null;
                            const hasDigit = digit !== null;
                            const digitStyle = { ...ss.otpDigit, color: hasDigit ? CT.BG_GRAY_900 : CT.BG_GRAY_200 };

                            return (
                                <React.Fragment key={key}>
                                    <Text style={digitStyle}>{digit ?? "-"}</Text>
                                    {n === 2 && <View style={{ width: 5 }} />}
                                </React.Fragment>
                            );
                        })}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={ss.ctaNotReceive}>Didn't receive the code?</Text>
                    <TouchableOpacity disabled={sec > 0}>
                        <Text style={{ ...ss.ctaResend, opacity: resendDisabled ? 0.3 : 1 }}>
                            {resendDisabled ? `RESEND IN ${sec}s` : "RESEND CODE"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    ref={ref}
                    value={otp}
                    style={ss.inputStyle}
                    onChangeText={onChangeOTP}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoFocus
                />
            </KeyboardAvoidingView>
        </Container>
    );
}

const ss = StyleSheet.create({
    description: {
        marginTop: 15,
    },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        color: CT.BG_GRAY_400,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 4,
    },
    subtitlePhone: {
        color: CT.BG_GRAY_500,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
    },
    subtitleWrongNumber: {
        color: CT.CTA_NEUTRAL,
        fontSize: 12,
        marginLeft: 3,
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
        fontSize: 38,
        textAlign: "center",
        fontWeight: "700",
    },

    ctaNotReceive: {
        color: CT.BG_GRAY_500,
        padding: 10,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    ctaResend: {
        color: CT.CTA_NEUTRAL,
        padding: 10,
        textAlign: "center",
        fontSize: 18,
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
        opacity: 0,
        width: 0,
        height: 0,
        position: "absolute",
    },
});
