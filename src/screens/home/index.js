import React from "react";
// import CT from "../../const.json";
import Pet from "../../components/home/pet";
import Menu from "../../components/layout/menu";
import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Header from "../../components/layout/header";
import Container from "../../components/container";
import { Text } from "react-native";

export default function HomeScreen({ route }) {
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
                <Header horizontal>
                    <Pet active />
                    <Pet add />
                </Header>
                <Body>
                    <Text>Asdas</Text>
                </Body>
            </Layout>

            <Menu name={route?.name} />
        </Container>
    );
}
