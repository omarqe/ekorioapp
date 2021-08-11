import React from "react";
import _isArray from "lodash/isArray";

export default function renderStacks(Stack, screens = [], options = {}) {
    if (_isArray(screens) && screens.length > 0) {
        return (
            <Stack.Navigator {...options}>
                {screens.map((props, i) => {
                    return <Stack.Screen key={i} {...props} />;
                })}
            </Stack.Navigator>
        );
    }
    return null;
}
