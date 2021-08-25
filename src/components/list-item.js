import React, { useState } from "react";
import CT from "../const";

import Icon from "./icon";
import Text from "./text";
import Badge from "./badge";
import PropTypes from "prop-types";
import { View, Pressable, StyleSheet } from "react-native";

import _omit from "lodash/omit";
export default function ListItem(props) {
    const { padded = false, tags, badge, last, icon, text, subtitle, onPressIn, onPressOut } = props;
    const appendedProps = _omit(props, [
        "padded",
        "badge",
        "style",
        "tags",
        "last",
        "icon",
        "text",
        "subtitle",
        "onPressIn",
        "onPressOut",
    ]);

    const [pressed, setPressed] = useState(false);
    const _onPressIn = () => {
        setPressed(true);
        if (typeof onPressIn === "function") {
            onPressIn();
        }
    };
    const _onPressOut = () => {
        setPressed(false);
        if (typeof onPressOut === "function") {
            onPressOut();
        }
    };

    let baseStyle = styles.base;

    if (last) baseStyle = { ...baseStyle, borderBottomWidth: 1 };
    if (padded) baseStyle = { ...baseStyle, paddingVertical: 15 };
    if (pressed) baseStyle = { ...baseStyle, backgroundColor: CT.BG_GRAY_50 };

    return (
        <Pressable style={baseStyle} onPressIn={_onPressIn} onPressOut={_onPressOut} {...appendedProps}>
            {icon && (
                <View style={styles.iconContainer}>
                    <Icon icon={`fal ${icon}`} size={20} color={CT.BG_GRAY_300} />
                </View>
            )}
            <View style={styles.labelContainer}>
                <Text style={styles.title}>{text}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                {badge && (
                    <View style={styles.badgeContainer}>
                        <Badge xs {...badge} />
                    </View>
                )}

                {tags && (
                    <View style={styles.tags}>
                        {tags.map(({ icon, text, iconProps }, i) => {
                            return (
                                <View key={i} style={styles.tagItem}>
                                    <Icon icon={`fal ${icon}`} size={12} style={styles.tagIcon} {...iconProps} />
                                    <Text style={styles.tagText}>{text}</Text>
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: CT.VIEW_PADDING_X,
        backgroundColor: CT.BG_WHITE,
        borderTopWidth: 1,
        borderColor: CT.BG_GRAY_100,
    },
    iconContainer: {
        width: 25,
        marginRight: 10,
    },
    labelContainer: {
        flex: 1,
        position: "relative",
    },
    badgeContainer: {
        top: 0,
        right: 0,
        position: "absolute",
    },
    title: {
        color: CT.FONT_COLOR,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 2,
    },
    subtitle: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 14,
    },
    tags: {
        display: "flex",
        marginTop: 15,
        flexDirection: "row",
    },
    tagItem: {
        display: "flex",
        alignItems: "center",
        marginRight: 3,
        flexDirection: "row",

        padding: 3,
        borderRadius: 5,
        backgroundColor: "rgba(0,0,0,.05)",
    },
    tagIcon: {
        color: CT.BG_GRAY_300,
        marginRight: 3,
    },
    tagText: {
        color: CT.BG_GRAY_600,
        fontSize: 12,
    },
});

ListItem.propTypes = {
    padded: PropTypes.bool,
    badge: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.object),
    icon: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]).isRequired,
    last: PropTypes.bool,
    subtitle: PropTypes.string,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};
