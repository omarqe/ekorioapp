import { createContext } from "react";

export default {
    Login: createContext({ navigation: null, fields: [] }),
    Fields: createContext({ ref: null }),
};
