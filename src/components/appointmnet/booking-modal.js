import React from "react";
import CT from "../../const";

import List from "../list";
import Input from "../input";
import Modal from "../modal";
import PropTypes from "prop-types";

import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function BookingModal({ data, open = false, onClose, onChoose }) {
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
                <List list={data} onPress={onChoose} padded />
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
        fontSize: 16,
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
    data: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool,
    onPress: PropTypes.func,
    onChoose: PropTypes.func,
};
