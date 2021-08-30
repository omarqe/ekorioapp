import React, { useRef, useState, useEffect, useContext } from "react";
import CT from "../../const.js";
import Text from "../../components/text";
import Context from "../../components/context";
import OTPIcon from "../../../assets/arts/otp-icon.svg";
import Container from "../../components/container";
import ButtonIcon from "../../components/button-icon";
import KeyboardAvoiding from "../../components/keyboard-avoiding";
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import _times from "lodash/times";

export default function SignupVerifyScreen({ navigation }) {
    const [otp, setOTP] = useState("");
    const [sec, setSec] = useState(CT.LOGIN_OTP_TIMEOUT);
    const ref = useRef(null);
    const auth = useContext(Context.Auth);
    const resendDisabled = sec > 0;
    const goBack = () => navigation.goBack();
    const onFocus = () => ref?.current?.focus();
    const onChangeOTP = (otp) => {
        console.log("otp", otp);
        setOTP(otp);
        if (otp?.length >= 6) {
            auth.onLogin(true);
        }
    };

    // Resend OTP timer
    useEffect(() => {
        const timer = sec > 0 && setInterval(() => setSec(sec - 1), 1000);
        return () => clearInterval(timer);
    }, [sec]);

    return (
        <Container paddingX={25} statusBarStyle="dark" safeTop="light" isLogin>
            <View style={styles.top}>
                <ButtonIcon icon="arrow-left" onPress={goBack} inverted />
            </View>
            <KeyboardAvoiding style={styles.body}>
                <OTPIcon />
                <View style={styles.description}>
                    <Text style={styles.heading}>Please enter verification code</Text>
                    <Text style={styles.subtitle}>We've sent verification code to:</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.subtitlePhone}>+60 12-345 6789</Text>
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
                    <TouchableOpacity disabled={sec > 0}>
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
