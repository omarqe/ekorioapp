import React, { useRef, useState, createContext } from "react";
import Field from "./field";
import PropTypes from "prop-types";
import FieldContext from "./field-context";

const fields = ({ fields = [], grouping = false }) => {
    let refs = [];

    return fields.map((props, i) => {
        refs.push(useRef(null));
        const next = i + 1;
        const isLastInput = i === fields.length - 1;

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
            <FieldContext.Provider value={{ ref: refs[i] }}>
                <Field key={i} {...props} />
            </FieldContext.Provider>
        );
    });
};

fields.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    grouping: PropTypes.bool,
};

export default fields;
