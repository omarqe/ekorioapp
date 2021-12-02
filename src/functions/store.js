import * as SecureStore from "expo-secure-store";

export default {
    save: async (key, value) => {
        return await SecureStore.setItemAsync(key, value);
    },
    get: async (key) => {
        return await SecureStore.getItemAsync(key);
    },
    delete: async (key) => {
        return await SecureStore.deleteItemAsync(key);
    },
};
