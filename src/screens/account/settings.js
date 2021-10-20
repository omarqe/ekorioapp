import React, { useState, useEffect } from "react";
import CT from "../../const";

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

import _map from "lodash/map";
import _sortBy from "lodash/sortBy";
import _lowerCase from "lodash/lowerCase";
import _makeBirthdate from "../../functions/makeBirthdate";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";

export default function AccountSettingsScreen({ navigation, route }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { address } = data ?? {};

    const _onChangeAddress = (value, name) => setData({ ...data, address: { ...data?.address, [name]: value } });
    const _onChange = (value, name) => setData({ ...data, [name]: value });
    const _onSubmit = () => {
        setLoading(true);
        Object.keys(address).map((key) => {
            if (address.hasOwnProperty(key)) {
                data[`address.${key}`] = address[key];
            }
        });
        http.put("/users/update", net.data(data))
            .then(({ data }) => {
                navigation.navigate("account", { shouldRefresh: Date.now() });
                toast.fromData(data, "response[0].message");
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    };

    const countryOptions = Object.keys(countries).map((key) => {
        if (countries.hasOwnProperty(key)) {
            const { name } = countries[key];
            return { value: name, label: name };
        }
    });
    const stateOptions = CT.STATES.map((state) => {
        return { label: state, value: state };
    });

    useEffect(() => {
        const { user } = route?.params || {};
        setData({ ...user, birthday: _makeBirthdate(user?.birthday) });
    }, []);

    const isUpdate = data?.id !== null && data?.id !== undefined;
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
                    disabled: isUpdate,
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
                        value: data?.birthday || new Date(),
                        dateFormat: CT.DATE_FORMAT_PRETTY,
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
                        type: address?.country === "Malaysia" ? "select" : "text",
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
                                <FloatingFields fields={fields} onChange={onChange} disabled={loading} />
                            </View>
                        ))}
                        <Button text="Update Account" color="yellow" onPress={_onSubmit} loading={loading} />
                    </Body>
                </Layout>
            </Container>
        </KeyboardAvoiding>
    );
}

const styles = StyleSheet.create({});
