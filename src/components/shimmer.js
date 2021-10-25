import CT from "../const";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function Shimmer({ contentStyle, color = null, colors = null, children, loading = true, style, ...rest }) {
    colors = colors !== null ? colors : [CT.BG_GRAY_100, CT.BG_GRAY_100, CT.BG_GRAY_50];
    if (color === "purple") {
        colors = [CT.BG_PURPLE_600, CT.BG_PURPLE_600, CT.BG_PURPLE_500];
    }

    return (
        <ShimmerPlaceholder visible={!loading} style={style} shimmerColors={colors} {...rest}>
            <View style={contentStyle}>{children}</View>
        </ShimmerPlaceholder>
    );
}

Shimmer.propTypes = {
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    color: PropTypes.oneOf(["gray", "purple"]),
    colors: PropTypes.array,
    loading: PropTypes.bool,
    contentStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
