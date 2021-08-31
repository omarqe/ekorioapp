import React, { useState, useEffect } from "react";

import Button from "../../components/button";
import Heading from "../../components/heading";
import FloatingFields from "../../components/floating-fields";

import Body from "../../components/layout/body";
import Layout from "../../components/layout";
import TopBar from "../../components/topbar";
import Container from "../../components/container";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import { countries } from "countries-list";
import { View, StyleSheet } from "react-native";

import account from "../../../data/account.json";
import _sortBy from "lodash/sortBy";
import _lowerCase from "lodash/lowerCase";

export default function AccountSettingsScreen({ navigation }) {
    const [data, setData] = useState(null);
    const { address } = data ?? {};
    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onChangeAddress = (value, name) => setData({ ...data, address: { ...data?.address, [name]: value } });

    const countryOptions = Object.keys(countries).map((key) => {
        if (countries.hasOwnProperty(key)) {
            const { name } = countries[key];
            return { value: _lowerCase(key), label: name };
        }
    });
    const stateOptions = [
        { value: "kedah", label: "Kedah" },
        { value: "penang", label: "Penang" },
        { value: "terengganu", label: "Terengganu" },
        { value: "johor", label: "Johor" },
        { value: "perlis", label: "Perlis" },
        { value: "kelantan", label: "Kelantan" },
        { value: "melaka", label: "Melaka" },
        { value: "n_sembilan", label: "N. Sembilan" },
        { value: "perak", label: "Perak" },
        { value: "pahang", label: "Pahang" },
        { value: "selangor", label: "Selangor" },
        { value: "sabah", label: "Sabah" },
        { value: "sarawak", label: "Sarawak" },
        { value: "wpkl", label: "Kuala Lumpur" },
        { value: "wpl", label: "Labuan" },
        { value: "wpp", label: "Putrajaya" },
    ];

    useEffect(() => {
        setData(account);
    }, []);

    const fieldGroups = [
        {
            heading: "Personal Details",
            onChange: _onChange,
            fields: [
                { name: "name", type: "name", label: "Full Name", value: data?.name, placeholder: "John Doe" },
                { name: "email", type: "email", label: "Email Address", value: data?.email, placeholder: "you@email.com" },
                {
                    nameCC: "callingCode",
                    name: "phone",
                    type: "phone",
                    label: "Phone Number",
                    value: data?.phone,
                    callingCode: data?.callingCode,
                    placeholder: "123456789",
                },
                [
                    {
                        name: "gender",
                        type: "select",
                        label: "Gender",
                        value: data?.gender,
                        placeholder: "Please select",
                        options: [
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                        ],
                    },
                    {
                        type: "date",
                        name: "birthday",
                        label: "Birthday",
                        value: new Date(),
                        dateFormat: "D MMM, YYYY",
                        placeholder: "01/01/1970",
                    },
                ],
            ],
        },
        {
            heading: "Address",
            onChange: _onChangeAddress,
            description: "Your home address is used to find nearby veterinars.",
            fields: [
                {
                    name: "street1",
                    label: "Address Line 1",
                    value: address?.street1,
                    placeholder: "Unit, street name, etc.",
                },
                {
                    name: "street2",
                    label: "Address Line 2 (Optional)",
                    value: address?.street2,
                    placeholder: "Apartment, suites, etc.",
                },
                [
                    {
                        name: "postcode",
                        type: "number",
                        label: "Postcode",
                        value: address?.postcode,
                        placeholder: "63000",
                        maxLength: 5,
                    },
                    {
                        name: "city",
                        label: "City",
                        value: address?.city,
                        placeholder: "Cyberjaya",
                    },
                ],
                [
                    {
                        name: "state",
                        type: address?.country === "my" ? "select" : "text",
                        label: "State",
                        value: address?.state,
                        placeholder: "Selangor",
                        options: _sortBy(stateOptions, "label"),
                    },
                    {
                        name: "country",
                        type: "select",
                        label: "Country",
                        value: address?.country,
                        placeholder: "Malaysia",
                        options: _sortBy(countryOptions, "label"),
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
                        {fieldGroups.map(({ heading, onChange, description, fields }, i) => (
                            <View key={i} style={{ marginBottom: 25 }}>
                                <Heading text={heading} subtitle={description} />
                                <FloatingFields fields={fields} onChange={onChange} />
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
