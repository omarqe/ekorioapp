import React from "react";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

export default function HomeScreen({ navigation }) {
    return (
        <Container>
            <TopBar type={2} rightIcon="bell" rightIconProps={{ onPress: () => alert("Opening notifications..") }} />
        </Container>
    );
}
