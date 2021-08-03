import { createContext } from "react";

export default {
    Login: createContext({ navigation: null, fields: [], grouping: false }),
    Fields: createContext({ ref: null }),
};
