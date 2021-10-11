import CT from "../const";
import React from "react";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function Shimmer({ style, children, loading = true, shimmerStyle, ...restProps }) {
    const colors = [CT.BG_GRAY_100, CT.BG_GRAY_100, CT.BG_GRAY_50];
    return (
        <ShimmerPlaceholder visible={!loading} style={[styles.base, shimmerStyle]} shimmerColors={colors} {...restProps}>
            <View style={style}>{children}</View>
        </ShimmerPlaceholder>
    );
}

Shimmer.propTypes = {
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    loading: PropTypes.bool,
};

const styles = StyleSheet.create({
    base: {
        opacity: 0.7,
    },
});
