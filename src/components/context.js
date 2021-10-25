import { createContext } from "react";

export default {
    Auth: createContext({ uid: 0, setUID: null, setToken: null, setAuthed: null }),
    Login: createContext({
        navigation: null,
        fields: [],
        loading: false,
        grouping: false,
        onSubmit: null,
        onChange: null,
        swapTitle: false,
    }),
    Fields: createContext({ ref: null }),
};
