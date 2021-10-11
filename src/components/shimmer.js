import CT from "../const";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function Shimmer({ style, colors: c = null, children, loading = true, shimmerStyle, ...restProps }) {
    const colors = c !== null ? c : [CT.BG_GRAY_100, CT.BG_GRAY_100, CT.BG_GRAY_50];

    return (
        <ShimmerPlaceholder visible={!loading} style={shimmerStyle} shimmerColors={colors} {...restProps}>
            <View style={style}>{children}</View>
        </ShimmerPlaceholder>
    );
}

Shimmer.propTypes = {
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    colors: PropTypes.array,
    loading: PropTypes.bool,
    shimmerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
