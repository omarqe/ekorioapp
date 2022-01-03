import React, { useRef } from "react";
import Field from "./field";
import Context from "./context";
import PropTypes from "prop-types";

const fields = ({ fields = [], grouping = false, ...restProps }) => {
    let refs = [];
    const Provider = Context.Fields.Provider;

    return fields.map((props, i) => {
        refs.push(useRef(null));
        const next = i + 1;
        const style = props?.style ?? {};
        const hidden = props?.hidden ?? false;
        const isLastInput = i === fields.length - 1;

        if (hidden) props.style = { ...style, display: "none" };
        if (isLastInput) props.last = true;
        if (grouping) {
            if (props?.returnKeyType === undefined && !isLastInput) {
                props.returnKeyType = "next";
                props.onSubmitEditing = () => {
                    refs[next]?.current?.focus();
                };
            }
        }

        return (
            <Provider key={i} value={{ ref: refs[i] }}>
                <Field {...restProps} {...props} />
            </Provider>
        );
    });
};

fields.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    grouping: PropTypes.bool,
    onChange: PropTypes.func,
};

export default fields;
