import React, { useState } from "react";
import CT from "../../const";
import Text from "../text";
import Icon from "../icon";
import Shimmer from "../shimmer";
import PropTypes from "prop-types";
import { View, Image, Pressable, StyleSheet } from "react-native";

import _omit from "lodash/omit";
import _renderIf from "../../functions/renderIf";
import _getPetImageSrc from "../../functions/getPetImageSrc";

export default function Pet(props) {
    let { name, image = null, theme = "default", active, checked } = props;
    const [pressed, setPressed] = useState(false);
    const { useLocalImage = false, loading = false, deemphasized = false, defaultSource = false } = props;
    const { size = 60, padding = 3, borderRadius = null } = props;
    const { phIcon = null, phIconProps } = props;

    const {
        nameStyle: _nameStyle,
        baseStyle: _baseStyle,
        imageStyle: _imageStyle,
        imageBaseStyle: _imageBaseStyle,
        overlayStyle: _overlayStyle,
        iconBackdropStyle: _iconBackdropStyle,
    } = props;

    const width = size + padding * 2;
    const height = width;
    const radius = borderRadius ? borderRadius : size * 0.35;
    const isLight = theme === "light";
    const hasImage = image && image?.length > 0;

    const remoteImage = _getPetImageSrc(image);
    const imageURL = typeof image === "string" ? { uri: useLocalImage ? image : remoteImage } : image;
    const imageProps = defaultSource ? { defaultSource: imageURL } : { source: imageURL };

    let pressable = {};
    if (!loading) {
        pressable = {
            onPressIn: setPressed.bind(null, true),
            onPressOut: setPressed.bind(null, false),
        };
    }

    let nameStyle = { width };
    let baseStyle = { padding, width, height, borderRadius: radius };
    let imageStyle = { width: size, height: size, borderRadius: radius - padding };
    let imageBaseStyle = { width: size, height: size, borderRadius: radius - padding };
    let overlayStyle = { backgroundColor: isLight ? CT.BG_WHITE : CT.BG_PURPLE_900, opacity: isLight ? 0.7 : 0.4 };
    let iconBackdropStyle = {
        width: size * 0.32,
        height: size * 0.32,
        borderRadius: size * 0.32,
        backgroundColor: isLight ? CT.CTA_POSITIVE : CT.BG_PURPLE_500,
    };

    // Alter the styles based on several conditions
    if (pressed) baseStyle = { ...baseStyle, transform: [{ scale: 0.97 }] };
    if (active) {
        baseStyle = { ...baseStyle, backgroundColor: CT.BG_YELLOW_500 };
        nameStyle = { ...nameStyle, color: CT.BG_YELLOW_600 };
    } else if (isLight) {
        baseStyle = { ...baseStyle, backgroundColor: CT.BG_GRAY_100 };
        nameStyle = { ...nameStyle, color: checked ? CT.BG_GRAY_800 : CT.BG_GRAY_400 };
        imageBaseStyle = { ...imageBaseStyle, backgroundColor: CT.BG_GRAY_100 };
        if (CT.IS_IOS) {
            baseStyle = { ...baseStyle, backgroundColor: CT.BG_WHITE, ...CT.SHADOW_MD, shadowOpacity: 0.09 };
        }
    }

    // If deemphasized
    if (deemphasized && !active) {
        baseStyle = { ...baseStyle, opacity: 0.4 };
    }

    const imageBase = [styles.imageBase, imageBaseStyle, _imageBaseStyle];
    const shimmerColor = isLight ? "gray" : "purple";

    return (
        <Pressable {..._omit(props, ["onPressIn", "onPressOut"])} {...pressable}>
            <View style={[styles.base, baseStyle, _baseStyle]}>
                {_renderIf(
                    loading,
                    <Shimmer style={imageBase} color={shimmerColor} />,
                    <View style={imageBase}>
                        {_renderIf(
                            hasImage,
                            <Image style={[styles.image, imageStyle, _imageStyle]} resizeMode="cover" {...imageProps} />,
                            _renderIf(
                                !loading,
                                <Icon
                                    icon={phIcon ?? "fas paw"}
                                    size={size * 0.25}
                                    color={isLight ? CT.BG_GRAY_300 : CT.BG_PURPLE_500}
                                    {...phIconProps}
                                />
                            )
                        )}
                        {checked && (
                            <React.Fragment>
                                <View style={[imageBaseStyle, styles.overlay, overlayStyle, _overlayStyle]} />
                                <View style={[styles.iconBackdrop, iconBackdropStyle, _iconBackdropStyle]} />
                                <Icon icon="fas check-circle" size={size * 0.35} color={CT.BG_WHITE} style={styles.icon} />
                            </React.Fragment>
                        )}
                    </View>
                )}
            </View>

            {_renderIf(
                loading || (name !== "" && name !== null && name !== undefined),
                _renderIf(
                    loading,
                    <View style={styles.nameShimmer}>
                        <Shimmer width={40} height={10} color={shimmerColor} />
                    </View>,
                    <Text style={[styles.name, nameStyle, _nameStyle]} numberOfLines={1}>
                        {name}
                    </Text>
                )
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: CT.BG_PURPLE_600,
    },
    imageBase: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CT.BG_PURPLE_800,
    },
    name: {
        color: CT.BG_PURPLE_300,
        fontSize: 11,
        fontWeight: "500",
        textAlign: "center",
        paddingTop: 8,
        paddingHorizontal: 3,
    },
    nameShimmer: {
        paddingTop: 8,
        alignItems: "center",
    },
    icon: {
        position: "absolute",
        ...CT.SHADOW_MD,
    },
    iconBackdrop: {
        position: "absolute",
    },
    overlay: {
        opacity: 0.4,
        position: "absolute",
    },
});

Pet.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object,
    theme: PropTypes.oneOf(["default", "light"]),
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    borderRadius: PropTypes.number,

    active: PropTypes.bool,
    checked: PropTypes.bool,
    padding: PropTypes.number,
    onPress: PropTypes.func,
    defaultSource: PropTypes.bool,
    deemphasized: PropTypes.bool,

    nameStyle: PropTypes.object,
    baseStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    imageBaseStyle: PropTypes.object,
    overlayStyle: PropTypes.object,
    iconBackdropStyle: PropTypes.object,

    phIcon: PropTypes.string,
    phIconProps: PropTypes.object,
};
