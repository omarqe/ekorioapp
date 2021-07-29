import React from "react"
import renderIf from "../functions/renderIf"
import { View, Text, StyleSheet } from "react-native"

export default function TopBar(type = null) {
    return (
        <View style={s.primary}>
            {renderIf(type === null, <Text style={s.heading}>Something</Text>)}
        </View>
    )
}

const s = StyleSheet.create({
    primary: {
        color: "#fff",
        paddingTop: 60,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
        backgroundColor: "#1A1424",
    },
    heading: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "600",
    }
})