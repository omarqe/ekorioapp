import React from "react";
import CT from "../../const.json";
import Menu from "../../components/layout/menu";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Header from "../../components/layout/header";
import Container from "../../components/container";
import { View, Text } from "react-native";

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

            <Layout withHeader>
                <Header>
                    <Text style={{ color: CT.BG_PURPLE_300 }}>This is a header</Text>
                </Header>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        padding: CT.VIEW_PADDING_X,
                        marginTop: -CT.BODY_RADIUS,
                        backgroundColor: CT.BG_WHITE,
                        borderTopLeftRadius: CT.BODY_RADIUS,
                        borderTopRightRadius: CT.BODY_RADIUS,
                    }}
                >
                    <Text>asdasdasd</Text>
                </View>
            </Layout>

            <Menu />
        </Container>
    );
}
