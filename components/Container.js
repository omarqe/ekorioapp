import React from "react";
import Header from "./Header";
import { StyleSheet, View } from "react-native";

export default function Container({ children }) {
    return (
        <View style={s.container}>
            <Header />
            {children}
        </View>
    );
}

const s = StyleSheet.create({
    container: {},
});
