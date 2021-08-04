import React from "react";
import CT from "../const.json";
import Logo from "../../assets/logo.svg";
import ButtonOrb from "../components/button-orb";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const TopBar = (props) => {
    let { type = 0, style = {}, title = "", logoProps = {} } = props;
    let { leftIcon, leftIconProps = {}, rightIcon, rightIconProps = {} } = props;

    let topBarStyle = { ...ss.base, ...style };

    switch (type) {
        case 0:
        default:
            const rightIconStyle = rightIconProps?.style || {};
            rightIconProps = _omit(rightIconProps, ["style"]);

            return (
                <View style={topBarStyle}>
                    <View style={ss.content}>
                        <View style={{ ...ss.leftContent, paddingTop: 4, justifyContent: "flex-start" }}>
                            <Logo {...logoProps} />
                        </View>
                        <View style={ss.rightContent}>
                            {rightIcon && (
                                <ButtonOrb
                                    glow
                                    icon={rightIcon}
                                    style={{ ...ss.rightIcon, marginRight: 0, ...rightIconStyle }}
                                    {...rightIconProps}
                                />
                            )}
                        </View>
                    </View>
                </View>
            );

        case 1:
            return (
                <View style={topBarStyle}>
                    <View style={ss.content}>
                        <View style={ss.leftContent}>
                            {leftIcon && (
                                <ButtonOrb
                                    icon={leftIcon}
                                    style={ss.leftIcon}
                                    color={CT.BG_PURPLE_400}
                                    {...leftIconProps}
                                    small
                                />
                            )}
                        </View>
                        <View style={ss.midContent}>
                            <Text style={ss.title}>{title}</Text>
                        </View>
                        <View style={ss.rightContent}>
                            {rightIcon && (
                                <ButtonOrb
                                    icon={rightIcon}
                                    style={ss.rightIcon}
                                    color={CT.BG_PURPLE_400}
                                    {...rightIconProps}
                                    small
                                />
                            )}
                        </View>
                    </View>
                </View>
            );
    }
};

TopBar.propTypes = {
    type: PropTypes.oneOf(["default"]),
    style: PropTypes.object,
    title: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    logoProps: PropTypes.object,
    leftIconProps: PropTypes.object,
    rightIconProps: PropTypes.object,
};

const contentCommonStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
};
const ss = StyleSheet.create({
    base: {
        width: "100%",
        paddingTop: CT.VIEW_PADDING_TOP,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        paddingBottom: 20,
        backgroundColor: CT.BG_PURPLE_900,
    },
    content: {
        display: "flex",
        flexDirection: "row",
    },

    leftContent: {
        ...contentCommonStyle,
    },
    midContent: {
        ...contentCommonStyle,
        flex: 3,
    },
    rightContent: {
        ...contentCommonStyle,
        alignItems: "flex-end",
    },

    leftIcon: {
        marginLeft: -15,
    },
    rightIcon: {
        marginRight: -15,
    },

    text: {
        color: CT.BG_WHITE,
    },
    title: {
        color: CT.BG_WHITE,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        paddingTop: 5,
    },
});

export default TopBar;
