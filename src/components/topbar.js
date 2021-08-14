import React from "react";
import CT from "../const.js";
import Logo from "../../assets/logo.svg";
import ButtonIcon from "../components/button-icon";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _renderIf from "../functions/renderIf";

const TopBar = (props) => {
    let topBarStyle = { ...styles.base, ...style };
    let { type = 0, style = {}, kicker = null, title = null, subtitle = null, logoProps = {} } = props;
    let { leftIcon, leftIconProps = {}, rightIcon, rightIconProps = {}, leftComponent, rightComponent } = props;

    let leftIconStyle = styles.leftIcon;
    let rightIconStyle = styles.rightIcon;

    // Update margins
    if (leftIconProps.glow === true) leftIconStyle = { ...leftIconStyle, marginRight: 0 };
    if (rightIconProps.glow === true) rightIconStyle = { ...rightIconStyle, marginRight: 0 };

    const SideComponent = (props) => {
        const { right = false, style = {} } = props;

        const icon = !right ? leftIcon : rightIcon;
        const iconStyle = !right ? leftIconStyle : rightIconStyle;
        const iconProps = !right ? leftIconProps : rightIconProps;
        const component = !right ? leftComponent : rightComponent;

        if (component) {
            return component;
        } else if (icon) {
            const addedProps = _omit(props, ["right", "style"]);
            const addedStyle = { ...iconStyle, ...style };

            return <ButtonIcon icon={icon} style={addedStyle} color={CT.BG_PURPLE_400} {...iconProps} {...addedProps} small />;
        }
        return null;
    };

    switch (type) {
        case 0:
        default:
            return (
                <View style={topBarStyle}>
                    <View style={styles.content}>
                        <View style={styles.leftContent}>
                            <SideComponent />
                        </View>
                        <View style={styles.midContent}>
                            {kicker && <Text style={styles.kicker}>{kicker}</Text>}
                            <Text style={[styles.title, { fontSize: kicker || subtitle ? 16 : 18 }]}>{title}</Text>
                            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                        </View>
                        <View style={styles.rightContent}>
                            <SideComponent right />
                        </View>
                    </View>
                </View>
            );

        case 1:
            return (
                <View style={topBarStyle}>
                    <View style={styles.content}>
                        {leftIcon && (
                            <View style={styles.leftContent}>
                                <SideComponent />
                            </View>
                        )}
                        <View style={{ ...styles.midContent, flex: 8 }}>
                            <Text style={styles.largeTitle}>{title}</Text>
                        </View>
                        {rightIcon && (
                            <View style={styles.rightContent}>
                                <SideComponent right />
                            </View>
                        )}
                    </View>
                </View>
            );

        case 2:
            rightIconProps = _omit(rightIconProps, ["style"]);

            return (
                <View style={topBarStyle}>
                    <View style={styles.content}>
                        <View style={{ ...styles.leftContent, paddingTop: 4, justifyContent: "flex-start" }}>
                            <Logo {...logoProps} />
                        </View>
                        <View style={styles.rightContent}>
                            <SideComponent style={{ ...rightIconStyle, marginRight: 0 }} glow right />
                        </View>
                    </View>
                </View>
            );

        case 3:
            return (
                <View style={topBarStyle}>
                    <View style={styles.content}>
                        <View style={styles.leftContent}>
                            <SideComponent />
                        </View>
                        <View style={{ ...styles.midContent, alignItems: "center" }}>
                            <Logo {...logoProps} />
                        </View>
                        <View style={styles.rightContent}>
                            <SideComponent right />
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
    kicker: PropTypes.string,
    subtitle: PropTypes.string,
    logoProps: PropTypes.object,

    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftIconProps: PropTypes.object,
    rightIconProps: PropTypes.object,

    leftComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.node]),
    rightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.node]),
};

const contentCommonStyle = { flex: 1, height: 40, display: "flex", justifyContent: "center" };
const styles = StyleSheet.create({
    base: {
        width: "100%",
        zIndex: 10,
        // minHeight: CT.TOPBAR_MIN_HEIGHT,
        paddingTop: CT.VIEW_PADDING_TOP,
        paddingLeft: CT.VIEW_PADDING_X,
        paddingRight: CT.VIEW_PADDING_X,
        paddingBottom: 15,
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
    },
    kicker: {
        color: CT.BG_PURPLE_300,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 2,
    },
    subtitle: {
        color: CT.BG_PURPLE_300,
        fontSize: 14,
        textAlign: "center",
        marginTop: 2,
    },
    largeTitle: {
        color: CT.BG_WHITE,
        fontSize: 22,
        fontWeight: "600",
    },
});

export default TopBar;
