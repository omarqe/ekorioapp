import { createContext } from "react";

export default {
    Login: createContext({ navigation: null, fields: [], grouping: false, onSubmit: null }),
    Fields: createContext({ ref: null }),
};
