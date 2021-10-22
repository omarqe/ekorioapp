import React from "react";
import CT from "../../const";

import Text from "../text";
import List from "../list";
import Input from "../input";
import Modal from "../modal";
import Empty from "../empty";
import PropTypes from "prop-types";

import { View, ScrollView, StyleSheet } from "react-native";

import _find from "lodash/find";
import _filter from "lodash/filter";
import _renderIf from "../../functions/renderIf";

export default function BookingModal({ data, now, dayOfWeek, open = false, loading = false, onClose, onChoose }) {
    const ModalHeader = () => {
        return (
            <React.Fragment>
                <View style={styles.address}>
                    <Text style={styles.addressKicker}>Current location</Text>
                    <Text style={styles.addressText}>161, Jalan Teknokrat 5, 63000 Cyberjaya, Selangor</Text>
                </View>
                <Input style={styles.searchInput} icon="search" placeholder="Search for veterinar..." />
            </React.Fragment>
        );
    };

    let list = [];
    if (data?.length > 0) {
        list = data.map(({ id, name, street1, street2, postcode, city, state, day: businessDay }) => {
            const today = _find(businessDay, { day: dayOfWeek });
            const subtitle = _filter([street1, street2, postcode, city, state]).join(", ");
            const o = today?.start < 12 ? "AM" : "PM";

            // Open indicator
            let badge = { text: "Open", color: "green" };
            if (!today?.open || now > today?.end) {
                badge = { text: "Closed", color: "red" };
            } else if (today?.open && now < today?.start) {
                badge = { text: `Opens ${today?.start}${o}` };
            }

            return { id, text: `${name}, ${city}`, subtitle: subtitle, badge };
        });
    }

    const _onChoose = (index) => {
        if (typeof onChoose === "function") {
            const id = list[index]?.id;
            onChoose(id, index);
        }
    };

    return (
        <Modal
            open={open}
            title="Find Veterinar"
            theme="purple"
            style={styles.modal}
            onClose={onClose}
            headerStyle={styles.modalHeader}
            contentStyle={styles.modalContent}
            headerChildren={<ModalHeader />}
            avoidKeyboard
        >
            <ScrollView style={styles.searchResults} onStartShouldSetResponder={() => true}>
                {_renderIf(
                    data?.length < 1 && !loading,
                    <Empty
                        style={{ paddingTop: 60 }}
                        title="No veterinarian available"
                        subtitle="No veterinarian available at the moment"
                    />,
                    <List list={list} onPress={_onChoose} loading={loading} padded />
                )}
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    address: {
        paddingBottom: 15,
    },
    addressKicker: {
        color: CT.BG_PURPLE_400,
        fontWeight: "500",
        marginBottom: 3,
    },
    addressText: {
        color: CT.BG_PURPLE_100,
        fontSize: 14,
        fontWeight: "600",
    },

    searchInput: {
        borderWidth: 0,
    },
    searchResults: {
        maxHeight: CT.SCREEN_HEIGHT / 2,
        paddingBottom: 50,
    },

    modal: {
        backgroundColor: CT.BG_GRAY_50,
    },
    modalHeader: {
        paddingBottom: 25,
    },
    modalContent: {
        padding: 0,
        paddingBottom: 0,
    },
});

BookingModal.propTypes = {
    dayOfWeek: PropTypes.number,
    now: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool,
    onPress: PropTypes.func,
    onChoose: PropTypes.func,
};
