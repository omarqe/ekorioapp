import React from "react";
import CT from "../../const.json";
import TopBar from "../../components/topbar";
import Header from "../../components/header";
import Container from "../../components/container";
import { View, Text, ScrollView } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <Container>
            <TopBar
                type={2}
                leftIcon="arrow-left"
                rightIcon="bell"
                rightIconProps={{ onPress: () => alert("Opening notifications..") }}
                logoProps={{ onPress: () => alert("Moving up!") }}
            />

            <View style={{ flex: 1, zIndex: 90, position: "relative" }}>
                <View
                    style={{ top: 0, width: "100%", height: "50%", backgroundColor: CT.BG_PURPLE_900, position: "absolute" }}
                />
                <View
                    style={{ bottom: 0, width: "100%", height: "50%", backgroundColor: CT.BG_GRAY_50, position: "absolute" }}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Header />
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                            padding: 25,
                            marginTop: -CT.BODY_RADIUS,
                            backgroundColor: CT.BG_WHITE,
                            borderTopLeftRadius: CT.BODY_RADIUS,
                            borderTopRightRadius: CT.BODY_RADIUS,
                        }}
                    >
                        <Text>asdasdasd</Text>
                    </View>
                </ScrollView>
            </View>

            <View
                style={{
                    width: "100%",
                    height: 100,
                    borderTopWidth: 1,
                    borderTopColor: CT.BG_GRAY_100,
                    backgroundColor: CT.BG_WHITE,
                }}
            ></View>
        </Container>
    );
}
