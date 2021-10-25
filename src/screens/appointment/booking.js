import React, { useState, useEffect } from "react";
import CT from "../../const";

import Header from "../../components/layout/header";
import Layout from "../../components/layout";
import Body from "../../components/layout/body";
import Empty from "../../components/empty";
import BookingTime from "../../components/appointmnet/booking-time";
import BookingModal from "../../components/appointmnet/booking-modal";
import BookingBanner from "../../components/appointmnet/booking-banner";

import EmptyPetArt from "../../../assets/arts/ginger-cat-79.svg";
import VetClosedArt from "../../../assets/arts/ginger-cat-737.svg";
import DatePickerArt from "../../../assets/arts/ginger-cat-759.svg";

import Text from "../../components/text";
import TopBar from "../../components/topbar";
import Button from "../../components/button";
import PetList from "../../components/pet/pet-list";
import Heading from "../../components/heading";
import Container from "../../components/container";
import CalendarStrip from "../../components/calendar-strip";
import FloatingFields from "../../components/floating-fields";
import KeyboardAvoiding from "../../components/keyboard-avoiding";

import { View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

import net from "../../functions/net";
import http from "../../functions/http";
import toast from "../../functions/toast";
import moment from "moment";
import numeral from "numeral";

import _renderIf from "../../functions/renderIf";
import _isToday from "../../functions/isToday";
import _clone from "lodash/clone";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";

export default function AppointmentBookingScreen({ navigation }) {
    const today = moment().set({ hour: 0, minute: 0 });
    const whitelistDates = [{ start: moment(), end: moment().add(1, "month") }];

    const [vetPopup, setVetPopup] = useState(false);
    const [time, setTime] = useState(null);
    const [data, setData] = useState({ petId: 0, vetId: 0, serviceId: 0, date: today, remarks: "" });
    const [vetData, setVetData] = useState([]);
    const [petData, setPetData] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingVet, setLoadingVet] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);

    useEffect(() => {
        Promise.all([http.get("/appointments/services"), http.get("/pets")])
            .then(([{ data: serviceTypes }, { data: pets }]) => {
                if (pets?.length > 0) setPetData(pets);
                if (serviceTypes?.length > 0) {
                    const types = serviceTypes.map(({ id: value, name: label }) => {
                        return { label, value: value?.toString() };
                    });
                    setServiceTypes(types);
                }
                setLoading(false);
            })
            .catch(({ response }) => net.handleCatch(response, setLoading));
    }, []);

    const date = data?.date;
    const fields = [
        {
            name: "serviceId",
            type: "select",
            label: "Service Type",
            value: data?.serviceId,
            options: serviceTypes,
            placeholder: "Please select",
        },
        {
            name: "remarks",
            type: "textarea",
            label: "Remarks",
            value: data?.remarks,
            placeholder: "Write some remarks",
        },
    ];

    const sendHaptics = (style = Haptics.ImpactFeedbackStyle.Light) => Haptics.impactAsync(style);
    const _onResetDate = () => {
        sendHaptics(Haptics.ImpactFeedbackStyle.Heavy);
        setData({ ...data, date: today });
    };
    const _onSelectDate = (date) => {
        sendHaptics();
        setData({ ...data, date: !loading ? moment(date) : data.date });
    };
    const _onSelectTime = (t) => setTime(time === t ? null : t);
    const _onSelectPet = (petId) => setData({ ...data, petId });
    const _onChangeDetails = (value, name) => setData({ ...data, [name]: value?.toString() });
    const _onVetPopupClose = () => setVetPopup(false);
    const _onVetPopupOpen = () => {
        if (vetData?.length < 1) {
            setLoadingVet(true);
            http.get("/vets")
                .then(({ data }) => {
                    setVetData(data);
                    setVetPopup(true);
                    setLoadingVet(false);
                })
                .catch(({ response }) => net.handleCatch(response, setLoading));
            return;
        }
        setVetPopup(true);
    };
    const _onVetSelect = (vetId) => {
        setData({ ...data, vetId });
        setVetPopup(false);
    };
    const _onSubmit = () => {
        const format = "YYYY-MM-DDTHH:mm:ss+08:00";
        const formdata = { ...data, date: date?.set({ hour: time, minute: 0, second: 0 }).format(format) };

        setLoadingForm(true);
        http.post("/appointments/create", net.data(formdata))
            .then(({ data = {} }) => {
                const { payload, success = false } = data;

                setLoadingForm(false);
                if (data?.success) {
                    toast.fromData(data, "response[0].message");
                    navigation.navigate("appointment", {
                        id: payload?.id,
                        serviceID: formdata.serviceId,
                        shouldRefresh: Date.now(),
                    });
                }
            })
            .catch(({ response }) => net.handleCatch(response, setLoadingForm));
    };

    let steps = [false, false, false];
    const now = moment().hour();
    const isToday = _isToday(date);
    const dayOfWeek = moment(date).weekday();

    const vetIndex = _findIndex(vetData, { id: data?.vetId });
    const currentVet = vetData[vetIndex];
    const operation = _find(currentVet?.day, { day: dayOfWeek });
    const isClosed = currentVet && (!operation?.open || (isToday && (now < operation?.start || now > operation?.end)));

    // Hide closed hours for the chosen vet
    let hiddenHours = [];
    let unavailableHours = [];
    for (let hr = 0; hr < 24; hr++) {
        if (hr < operation?.start || hr > operation?.end) {
            hiddenHours = [...hiddenHours, hr];
        }
        if (isToday && hr <= now) {
            unavailableHours = [...unavailableHours, hr];
        }
    }

    // Showing pet and appointment time
    if (currentVet && date) steps[0] = true;
    if (currentVet && data?.petId > 0) steps[1] = true;
    if (currentVet && operation?.open && date && time) steps[2] = true;

    return (
        <KeyboardAvoiding>
            <Container>
                <TopBar
                    title="Book Appointment"
                    leftIcon="arrow-left"
                    rightIcon={!isToday ? "history" : null}
                    leftIconProps={{ onPress: navigation.goBack }}
                    rightIconProps={{ onPress: _onResetDate, disabled: !date.isAfter(today) }}
                />

                <Layout gray withHeader>
                    {!loading && petData?.length > 0 && (
                        <Header style={styles.header} contentStyle={styles.headerContent}>
                            <CalendarStrip
                                selectedDate={date}
                                datesWhitelist={whitelistDates}
                                onDateSelected={_onSelectDate}
                            />
                        </Header>
                    )}

                    {!loading && petData?.length > 0 && (
                        <BookingBanner data={currentVet} offset={offset} onPress={_onVetPopupOpen} loading={loadingForm} />
                    )}

                    <Body style={styles.body} gray flex topRounded>
                        {_renderIf(
                            petData?.length < 1,
                            <Empty
                                art={EmptyPetArt}
                                artProps={{ height: 130 }}
                                title="You don't have any pet."
                                subtitle="Please add new, then start booking appointment"
                                button={{ text: "Add Pet", onPress: navigation.navigate.bind(null, "pet__form", null) }}
                            />,
                            <React.Fragment>
                                {_renderIf(
                                    !isClosed && steps[0] === true,
                                    <React.Fragment>
                                        <View style={[styles.section, { marginBottom: 30 }]}>
                                            <Heading kicker="Step 1:" text="Choose a Pet" kickerStyle={styles.kicker} />
                                            <View style={[styles.pets, { opacity: loadingForm ? 0.5 : 1 }]}>
                                                <PetList
                                                    data={petData}
                                                    theme="light"
                                                    checked={data?.petId}
                                                    loading={loading}
                                                    onPress={_onSelectPet}
                                                />
                                                {loadingForm && <View style={styles.overlay} />}
                                            </View>
                                        </View>
                                        <View style={[styles.section, { marginBottom: 30, opacity: !steps[1] ? 0.5 : 1 }]}>
                                            <Heading kicker="Step 2:" text="Appointment Time" kickerStyle={styles.kicker} />
                                            <BookingTime
                                                loading={loading}
                                                selected={time}
                                                disabled={currentVet === undefined || !steps[1] || loadingForm}
                                                onSelect={_onSelectTime}
                                                hidden={hiddenHours}
                                                unavailable={unavailableHours}
                                            />
                                        </View>
                                    </React.Fragment>,
                                    <Empty
                                        art={isClosed ? VetClosedArt : DatePickerArt}
                                        title={isClosed ? `${currentVet?.name} is closed` : "Please select date and vet"}
                                        subtitle={isClosed ? "Please find other veterinar or try another time" : null}
                                        artProps={{
                                            style: { marginBottom: 0, marginLeft: isClosed ? 30 : 0 },
                                            height: isClosed ? 200 : 160,
                                        }}
                                    />
                                )}
                                {_renderIf(
                                    !isClosed && steps[0],
                                    <React.Fragment>
                                        <View style={{ opacity: steps[2] ? 1 : 0.5 }}>
                                            <View style={[styles.section, { marginBottom: 15 }]}>
                                                <Heading
                                                    kicker="Step 3:"
                                                    text="Appointment Details"
                                                    kickerStyle={styles.kicker}
                                                />
                                                <FloatingFields
                                                    fields={fields}
                                                    disabled={!steps[2] || loadingForm}
                                                    onChange={_onChangeDetails}
                                                />
                                            </View>
                                            <Button
                                                text="Book Appointment"
                                                color="yellow"
                                                disabled={!steps[2]}
                                                loading={loadingForm}
                                                onPress={_onSubmit}
                                            />
                                            {steps[0] && steps[2] && (
                                                <Text style={styles.summary}>
                                                    {"Your appointment will be set on "}
                                                    <Text style={styles.sumHighlight}>
                                                        {moment(date).format("ddd, D MMMM, YYYY")}
                                                    </Text>
                                                    {" @ "}
                                                    <Text style={styles.sumHighlight}>
                                                        {numeral(time).format("00.00").replace(".", ":")}
                                                    </Text>
                                                    {" at "}
                                                    <Text style={styles.sumHighlight}>{currentVet?.name}.</Text>
                                                </Text>
                                            )}
                                        </View>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                    </Body>
                </Layout>

                <BookingModal
                    dayOfWeek={dayOfWeek}
                    now={now}
                    data={vetData}
                    open={vetPopup}
                    isToday={isToday}
                    onClose={_onVetPopupClose}
                    onChoose={_onVetSelect}
                    loading={loadingVet}
                />
            </Container>
        </KeyboardAvoiding>
    );
}

const offset = 38;
const styles = StyleSheet.create({
    pets: {
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    body: {
        paddingTop: offset + CT.VIEW_PADDING_X,
    },
    header: {
        paddingBottom: 0,
    },
    headerContent: {
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    section: {
        position: "relative",
        marginBottom: 20,
    },
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
    },
    summary: {
        color: CT.BG_GRAY_400,
        fontSize: 12,
        marginTop: 10,
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    sumHighlight: {
        color: CT.BG_GRAY_500,
        fontSize: 12,
        fontWeight: "600",
    },
    kicker: {
        fontSize: 10,
        fontWeight: "700",
        textTransform: "uppercase",
    },
});
