import React from "react";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

export default function HomeScreen() {
    return (
        <Container>
            <TopBar type={1} title="Add a New Pet" leftIcon="arrow-left" />
        </Container>
    );
}
