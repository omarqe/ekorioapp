import React from "react";
import CT from "../const.js";
import Logo from "../../assets/logo.svg";
import ButtonOrb from "../components/button-orb";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";

const TopBar = (props) => {
    let topBarStyle = { ...ss.base, ...style };
    let { type = 0, style = {}, title = null, subtitle = null, logoProps = {} } = props;
    let { leftIcon, leftIconProps = {}, rightIcon, rightIconProps = {} } = props;

    let leftIconStyle = ss.leftIcon;
    let rightIconStyle = ss.rightIcon;

    // Update margins
    if (leftIconProps.glow === true) leftIconStyle = { ...leftIconStyle, marginRight: 0 };
    if (rightIconProps.glow === true) rightIconStyle = { ...rightIconStyle, marginRight: 0 };

    switch (type) {
        case 0:
        default:
            return (
                <View style={topBarStyle}>
                    <View style={ss.content}>
                        <View style={ss.leftContent}>
                            {leftIcon && (
                                <ButtonOrb
                                    icon={leftIcon}
                                    style={leftIconStyle}
                                    color={CT.BG_PURPLE_400}
                                    {...leftIconProps}
                                    small
                                />
                            )}
                        </View>
                        <View style={ss.midContent}>
                            <Text style={ss.title}>{title}</Text>
                            {subtitle && <Text style={ss.subtitle}>{subtitle}</Text>}
                        </View>
                        <View style={ss.rightContent}>
                            {rightIcon && (
                                <ButtonOrb
                                    icon={rightIcon}
                                    style={rightIconStyle}
                                    color={CT.BG_PURPLE_400}
                                    {...rightIconProps}
                                    small
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
                        {leftIcon && (
                            <View style={ss.leftContent}>
                                <ButtonOrb
                                    icon={leftIcon}
                                    style={leftIconStyle}
                                    color={CT.BG_PURPLE_400}
                                    {...leftIconProps}
                                    small
                                />
                            </View>
                        )}
                        <View style={{ ...ss.midContent, flex: 8 }}>
                            <Text style={ss.largeTitle}>{title}</Text>
                        </View>
                        {rightIcon && (
                            <View style={ss.rightContent}>
                                <ButtonOrb
                                    icon={rightIcon}
                                    style={rightIconStyle}
                                    color={CT.BG_PURPLE_400}
                                    {...rightIconProps}
                                    small
                                />
                            </View>
                        )}
                    </View>
                </View>
            );

        case 2:
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
                                    style={{ ...rightIconStyle, marginRight: 0 }}
                                    {...rightIconProps}
                                />
                            )}
                        </View>
                    </View>
                </View>
            );

        case 3:
            return (
                <View style={topBarStyle}>
                    <View style={ss.content}>
                        <View style={ss.leftContent}>
                            {leftIcon && (
                                <ButtonOrb
                                    icon={leftIcon}
                                    style={leftIconStyle}
                                    color={CT.BG_PURPLE_400}
                                    {...leftIconProps}
                                    small
                                />
                            )}
                        </View>
                        <View style={{ ...ss.midContent, alignItems: "center" }}>
                            <Logo {...logoProps} />
                        </View>
                        <View style={ss.rightContent}>
                            {rightIcon && (
                                <ButtonOrb
                                    icon={rightIcon}
                                    style={rightIconStyle}
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
    type: PropTypes.oneOf([0, 1, 2, 3]),
    style: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    logoProps: PropTypes.object,
    leftIconProps: PropTypes.object,
    rightIconProps: PropTypes.object,
};

const contentCommonStyle = { flex: 1, display: "flex", justifyContent: "center" };
const ss = StyleSheet.create({
    base: {
        width: "100%",
        zIndex: 10,
        minHeight: CT.TOPBAR_MIN_HEIGHT,
        paddingTop: CT.VIEW_PADDING_TOP,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        paddingBottom: 10,
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
        marginLeft: -13,
    },
    rightIcon: {
        marginRight: -13,
    },

    text: {
        color: CT.BG_WHITE,
    },
    title: {
        color: CT.BG_WHITE,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        paddingTop: 2,
    },
    subtitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 12,
        textAlign: "center",
        marginTop: 1,
    },
    largeTitle: {
        color: CT.BG_WHITE,
        fontSize: 22,
        fontWeight: "600",
    },
});

export default TopBar;
