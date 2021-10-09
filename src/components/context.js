import { createContext } from "react";

export default {
    Auth: createContext({ onLogin: null }),
    Login: createContext({ navigation: null, fields: [], loading: false, grouping: false, onSubmit: null, swapTitle: false }),
    Fields: createContext({ ref: null }),
};
