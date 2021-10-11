import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function Shimmer({ style, children, loading, ...restProps }) {
    return (
        <ShimmerPlaceholder visible={!loading} {...restProps}>
            <View style={style}>{children}</View>
        </ShimmerPlaceholder>
    );
}

Shimmer.propTypes = {
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    loading: PropTypes.bool,
};
