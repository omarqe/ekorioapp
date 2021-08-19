import React from "react";
import CT from "../../const";

import Pet from "../../components/pet";
import Badge from "../../components/badge";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import Header from "../../components/layout/header";

import { Text, View, StyleSheet } from "react-native";

export default function Template({ navigation }) {
    return (
        <Container>
            <TopBar title="Add a Pet" leftIcon="arrow-left" leftIconProps={{ onPress: navigation.goBack }} />
            <Layout gray withHeader>
                <Header contentStyle={styles.headerContent} overlap>
                    <Pet
                        name="Cheshire"
                        borderRadius={35}
                        padding={5}
                        size={130}
                        nameStyle={styles.petName}
                        baseStyle={styles.petBase}
                        imageBaseStyle={styles.petImageBase}
                        phIconProps={{ color: CT.BG_PURPLE_200 }}
                    />
                    <Badge xs text="Breed: Maine Coon" style={styles.petBadge} />
                </Header>
                <Body gray flex overlap topRounded>
                    <Text>asdadasdads</Text>
                </Body>
            </Layout>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        alignItems: "center",
        flexDirection: "column",
    },
    petName: {
        color: CT.BG_PURPLE_100,
        fontSize: 20,
        fontWeight: "700",
        marginTop: 15,
    },
    petBase: {
        backgroundColor: CT.BG_PURPLE_100,
        ...CT.SHADOW_LG,
    },
    petImageBase: {
        backgroundColor: CT.BG_PURPLE_300,
    },
    petBadge: {
        marginTop: 3,
    },
});
