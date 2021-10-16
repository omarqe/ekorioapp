import Toast from "react-native-root-toast";

const defaultOptions = { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM - 20 };
export default {
    show: (message, options = {}) => Toast.show(message, { ...defaultOptions, ...options }),
};
