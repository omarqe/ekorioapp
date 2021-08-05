import React from "react";
import TopBar from "../../components/topbar";
import Container from "../../components/container";

export default function HomeScreen({ navigation }) {
    return (
        <Container>
            <TopBar
                type={2}
                title="Book Appointment"
                subtitle="Petsville Animal Clinic, Cyberjaya"
                leftIcon="chevron-left"
                leftIconProps={{ onPress: () => navigation.goBack() }}
                rightIcon="bell"
                rightIconProps={{ onPress: () => alert("Damn!") }}
            />
        </Container>
    );
}
