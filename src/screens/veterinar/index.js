import React from "react";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import { StyleSheet } from "react-native";

const VeterinarScreen = () => {
    return (
        <Container>
            <TopBar type={1} title="Find Veterinars" rightIcon="map-marker-alt" rightIconProps={{ glow: true }} />
        </Container>
    );
};

const styles = StyleSheet.create({});

export default VeterinarScreen;
