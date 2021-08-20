import React from "react";

import Button from "../../components/button";
import Heading from "../../components/heading";
import FloatingFields from "../../components/floating-fields";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import { View, StyleSheet } from "react-native";

export default function AccountSettingsScreen({ navigation }) {
    const fieldGroups = [
        {
            heading: "Personal Details",
            fields: [
                { type: "name", label: "Full Name", placeholder: "Eve Harrison", defaultValue: "Eve Harrison" },
                { type: "email", label: "Email Address", placeholder: "eve@email.com", defaultValue: "eve@email.com" },
                { type: "phone", label: "Phone Number", placeholder: "+60123456789", defaultValue: "+60123456789" },
                [
                    {
                        type: "select",
                        label: "Gender",
                        placeholder: "Please select",
                        options: [
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                        ],
                    },
                    { type: "text", label: "Birthday", placeholder: "01/01/1970", defaultValue: "01/01/1970" },
                ],
            ],
        },
        {
            heading: "Address",
            description: "Your home address is used to find nearby veterinars.",
            fields: [
                { label: "Address Line 1", placeholder: "Unit, street name, etc.", defaultValue: "1D, Jalan Teknokrat 5" },
                { label: "Address Line 2 (Optional)", placeholder: "Apartment, suites, etc." },
                [
                    { type: "number", label: "Postcode", placeholder: "63000", maxLength: 5, defaultValue: "63000" },
                    { label: "City", placeholder: "Cyberjaya", defaultValue: "Cyberjaya" },
                ],
                [
                    {
                        type: "select",
                        label: "State",
                        placeholder: "Selangor",
                        defaultValue: "Selangor",
                        options: [{ label: "Selangor", value: "selangor" }],
                    },
                    {
                        type: "select",
                        label: "Country",
                        placeholder: "Malaysia",
                        defaultValue: "Malaysia",
                        options: [{ label: "Malaysia", value: "malaysia" }],
                    },
                ],
            ],
        },
    ];

    return (
        <KeyboardAvoiding>
            <Container>
                <TopBar
                    type={1}
                    title="Account Settings"
                    leftIcon="arrow-left"
                    leftIconProps={{ onPress: navigation.goBack }}
                />
                <Layout alwaysBounceVertical={false} keyboardShouldPersistTaps="always" gray withHeader>
                    <Body gray flex topRounded>
                        {fieldGroups.map(({ heading, description, fields }, i) => (
                            <View key={i} style={{ marginBottom: 25 }}>
                                <Heading text={heading} subtitle={description} />
                                <FloatingFields fields={fields} />
                            </View>
                        ))}
                        <Button text="Update Account" color="yellow" onPress={navigation.goBack} />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
    );
}

const styles = StyleSheet.create({});
