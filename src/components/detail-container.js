import React from "react";
import CT from "../const";

import Header from "./layout/header";
import Body from "./layout/body";
import Layout from "./layout";

import Icon from "./icon";
import Badge from "./badge";
import TopBar from "./topbar";
import Banner from "./banner";
import Heading from "./heading";
import Container from "./container";
import ButtonIcon from "./button-icon";

import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import { useActionSheet, connectActionSheet } from "@expo/react-native-action-sheet";

import _omit from "lodash/omit";

const DetailContainer = connectActionSheet((props) => {
    let { children, badgeText, topbar = {}, heading = {} } = props;
    const { options = [], optionConfig = {}, optionCommands = [] } = props;
    const { bannerOptions = [], bannerIcon, bannerIconColor, bannerOptionConfig = {}, bannerOptionCommands = [] } = props;
    const { showActionSheetWithOptions } = useActionSheet();

    // List of predefined callbacks,
    const callbacks = {
        onGetDirections: () => {
            const options = ["Waze", "Google Maps", "Cancel"];
            const title = "Get Directions";
            const cancelButtonIndex = options.length - 1;
            showActionSheetWithOptions({ options, title, cancelButtonIndex }, (buttonIndex) => {
                const commands = [alert.bind(null, "Opening Waze"), alert.bind(null, "Opening Google Maps")];
                if (typeof commands[buttonIndex] === "function") {
                    commands[buttonIndex]();
                }
            });
        },
    };

    /**
     * Open the native ActionSheet.
     *
     * @param {string} x Determines the position of where this function is called. Can either be "top" or "banner".
     * @since 0.1
     */
    const onOptions = (x = "top") => {
        const option = {
            top: { config: { options: options, ...optionConfig }, commands: optionCommands },
            banner: { config: { options: bannerOptions, ...bannerOptionConfig }, commands: bannerOptionCommands },
        };

        showActionSheetWithOptions(option[x].config, (buttonIndex) => {
            const command = option[x].commands[buttonIndex];
            const typeofCommand = typeof command;
            switch (typeofCommand) {
                case "function":
                    command();
                    break;
                case "string":
                    if (typeof callbacks[command] === "function") {
                        callbacks[command]();
                    }
                    break;
            }
        });
    };

    // Fire when the banner icon is pressed
    const onPressBannerIcon = () => {
        if (typeof bannerOptions === "string" && typeof callbacks[bannerOptions] === "function") {
            callbacks[bannerOptions]();
            return;
        }

        onOptions("banner");
    };

    // Add option button on the top bar
    if (options?.length > 0) {
        topbar = {
            ...topbar,
            rightIcon: "ellipsis-h",
            rightIconProps: { onPress: onOptions.bind(null, "top") },
        };
    }

    return (
        <Container>
            {topbar && <TopBar {...topbar} />}
            <Header contentStyle={styles.headerContent} style={styles.header}>
                <Banner style={styles.banner} contentStyle={styles.bannerContentContainer}>
                    <View style={styles.bannerContent}>
                        <View style={styles.badgeContainer}>
                            {badgeText && <Badge text={badgeText} style={{ marginRight: 5 }} xs />}
                            {heading?.time && (
                                <View style={styles.timeContent}>
                                    <Icon icon="fas clock" size={12} style={styles.timeIcon} />
                                    <Text style={styles.time}>{heading?.time}</Text>
                                </View>
                            )}
                        </View>
                        <Heading size={0} gapless {...heading} />
                    </View>
                    {bannerOptions?.length > 0 && (
                        <ButtonIcon
                            icon={bannerIcon ?? "ellipsis-h"}
                            style={styles.directions}
                            weight="fas"
                            onPress={onPressBannerIcon}
                            iconProps={{ size: 20, color: bannerIconColor ?? CT.CTA_NEUTRAL }}
                            inverted
                        />
                    )}
                </Banner>
            </Header>
            <Layout showsVerticalScrollIndicator={false} gray>
                <Body style={styles.body} gray flex>
                    {children}
                </Body>
            </Layout>
        </Container>
    );
});

const offset = 35;
const styles = StyleSheet.create({
    id: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 5,
    },
    body: {
        marginTop: offset,
    },

    timeContent: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    time: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 14,
    },
    timeIcon: {
        color: CT.BG_GRAY_200,
        marginRight: 3,
    },

    header: {
        zIndex: 110,
        paddingBottom: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerContent: {
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bannerContentContainer: {
        display: "flex",
        flexDirection: "row",
    },
    banner: {
        marginBottom: -offset,
    },
    bannerContent: {
        flex: 1,
    },
    badgeContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingBottom: 5,
    },
    directions: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: CT.BG_WHITE,

        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",

        ...CT.SHADOW_LG,
    },
});

DetailContainer.propTypes = {
    options: PropTypes.array,
    optionConfig: PropTypes.object,
    optionCommands: PropTypes.array,

    bannerIcon: PropTypes.string,
    bannerIconColor: PropTypes.string,
    bannerOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    bannerOptionConfig: PropTypes.object,
    bannerOptionCommands: PropTypes.array,

    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    topbar: PropTypes.object.isRequired,
    heading: PropTypes.object.isRequired,
    badgeText: PropTypes.string,
};

export default DetailContainer;
