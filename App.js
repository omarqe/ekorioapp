import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <View style={st.container}>
            <StatusBar style="auto" />
            <Text style={st.text}>Hello</Text>
        </View>
    );
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 20,
    },
});
