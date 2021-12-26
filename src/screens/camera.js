import React, { useState, useEffect, useRef } from "react";
import { Image, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

import * as Haptics from "expo-haptics";

import CT from "../const";
import Icon from "../components/icon";
import toast from "../functions/toast";
import _renderIf from "../functions/renderIf";

export default function CameraScreen({ navigation, route }) {
    const petID = route?.params?.petID;
    const camera = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [ready, setReady] = useState(false);
    const [localImage, setLocalImage] = useState(null);
    const [snapPressed, setSnapPressed] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    const _onUndoSnap = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setLocalImage(null);
    };
    const _onComplete = () => {
        navigation.navigate("pet__form", { id: petID, recentPhoto: localImage });
    };
    const _onSnapIn = () => setSnapPressed(true);
    const _onSnapOut = () => setSnapPressed(false);
    const _onSnap = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (ready) {
            const { uri } = await camera.current.takePictureAsync({ quality: 0 });
            setLocalImage(uri);
        }
    };
    const _onToggleCameraType = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    });

    if (hasPermission === null) return <View />;
    if (hasPermission === false) {
        toast.show("Please allow camera access.");
        navigation.goBack();
        return <View />;
    }

    const hasLocalImage = localImage !== null && localImage?.length > 0;
    const buttons = hasLocalImage
        ? [
              { icon: "undo", onPress: _onUndoSnap },
              { icon: "check", inverted: true, onPress: _onComplete },
          ]
        : [
              { icon: "arrow-left", onPress: navigation.goBack },
              { icon: "repeat-alt", onPress: _onToggleCameraType },
          ];

    const SecondaryButton = ({ icon, onPress, inverted = false }) => (
        <TouchableOpacity
            style={[styles.secondButton, { backgroundColor: inverted ? CT.BG_WHITE : "#111" }]}
            onPress={onPress}
        >
            <Icon icon={["far", icon]} size={20} color={inverted ? CT.BG_GRAY_600 : CT.BG_GRAY_200} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraContainer}>
                {_renderIf(
                    hasLocalImage,
                    <Image source={{ uri: localImage }} style={styles.camera} />,
                    <Camera
                        ref={camera}
                        type={type}
                        ratio="1:1"
                        style={styles.camera}
                        onCameraReady={setReady.bind(null, true)}
                    />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.left}>{buttons[0] && <SecondaryButton {...buttons[0]} />}</View>
                <View style={styles.middle}>
                    {!hasLocalImage && (
                        <TouchableWithoutFeedback onPress={_onSnap} onPressIn={_onSnapIn} onPressOut={_onSnapOut}>
                            <View style={styles.buttonSnap}>
                                <View style={[styles.buttonSnapInner, snapPressed ? { borderWidth: 4 } : {}]} />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
                <View style={styles.right}>{buttons[1] && <SecondaryButton {...buttons[1]} />}</View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: CT.BG_BLACK,
    },
    camera: {
        width: "100%",
        marginTop: -50,
        paddingTop: "100%",
    },
    cameraContainer: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: "auto",
        justifyContent: "center",
    },
    secondButton: {
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    buttonSnap: {
        padding: 3,
        borderRadius: 50,
        backgroundColor: CT.BG_WHITE,
    },
    buttonSnapInner: {
        width: 65,
        height: 65,
        borderWidth: 3,
        borderColor: CT.BG_BLACK,
        borderRadius: 65,
        backgroundColor: CT.BG_WHITE,
    },

    left: {
        width: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    middle: {
        flex: 1,
        height: 65,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    right: {
        width: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        width: "100%",
        padding: 20,
        paddingBottom: 50,
        display: "flex",
        flexDirection: "row",
        backgroundColor: CT.BG_BLACK,
    },
});
