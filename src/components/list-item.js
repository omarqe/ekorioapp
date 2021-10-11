import React, { useState } from "react";
import CT from "../const";

import Icon from "./icon";
import Text from "./text";
import Badge from "./badge";
import Shimmer from "./shimmer";
import PropTypes from "prop-types";
import { View, Pressable, StyleSheet } from "react-native";

import _times from "lodash/times";
import _renderIf from "../functions/renderIf";

export default function ListItem({
    loading = false,
    padded = false,
    tags,
    badge,
    last,
    icon,
    text,
    subtitle,
    onPressIn,
    onPressOut,
    ...restProps
}) {
    const [pressed, setPressed] = useState(false);
    const _onPressIn = () => {
        if (!loading) {
            setPressed(true);
            if (typeof onPressIn === "function") {
                onPressIn();
            }
        }
    };
    const _onPressOut = () => {
        if (!loading) {
            setPressed(false);
            if (typeof onPressOut === "function") {
                onPressOut();
            }
        }
    };

    let baseStyle = styles.base;
    if (last) baseStyle = { ...baseStyle, borderBottomWidth: 1 };
    if (padded) baseStyle = { ...baseStyle, paddingVertical: 15 };
    if (pressed) baseStyle = { ...baseStyle, backgroundColor: CT.BG_GRAY_50 };

    return (
        <Pressable style={baseStyle} onPressIn={_onPressIn} onPressOut={_onPressOut} disabled={loading} {...restProps}>
            {icon && (
                <View style={styles.iconContainer}>
                    {_renderIf(
                        loading,
                        <Shimmer width={25} height={25} style={{ borderRadius: 20 }} />,
                        <Icon icon={`fal ${icon}`} size={20} color={CT.BG_GRAY_300} />
                    )}
                </View>
            )}
            <View style={styles.labelContainer}>
                {_renderIf(
                    loading,
                    <Shimmer height={12} style={{ marginBottom: 5 }} />,
                    <Text style={styles.title}>{text}</Text>
                )}
                {_renderIf(
                    subtitle,
                    _renderIf(loading, <Shimmer width={100} height={8} />, <Text style={styles.subtitle}>{subtitle}</Text>)
                )}
                {badge && (
                    <View style={styles.badgeContainer}>
                        {_renderIf(loading, <Shimmer width={60} height={12} />, <Badge xs {...badge} />)}
                    </View>
                )}

                {_renderIf(
                    loading,
                    <View style={styles.tags}>
                        {_times(2).map((n) => (
                            <Shimmer key={n} width={30} height={8} style={{ marginRight: 5 }} />
                        ))}
                    </View>,
                    tags && (
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
                    )
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
        fontSize: 13,
        fontWeight: "700",
        marginBottom: CT.LOW_RESOLUTION ? 0 : 2,
    },
    subtitle: {
        color: CT.FONT_COLOR_LIGHT,
        fontSize: 12,
    },
    tags: {
        display: "flex",
        marginTop: 10,
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
        color: CT.BG_GRAY_400,
        fontSize: CT.LOW_RESOLUTION ? 9 : 10,
        fontWeight: "500",
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
