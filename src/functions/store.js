import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

export default {
    save: async (key, value) => {
        await setItemAsync(key, value);
    },
    get: async (key) => {
        return await getItemAsync(key);
    },
    delete: async (key) => {
        deleteItemAsync(key);
    },
};
