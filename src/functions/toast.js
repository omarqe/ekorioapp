import Toast from "react-native-root-toast";
import _get from "lodash/get";

const defaultOptions = { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM - 20 };
export default {
    show: (message, options = {}) => Toast.show(message, { ...defaultOptions, ...options }),
    fromData: (data, path, options = {}) => Toast.show(_get(data, path), { ...defaultOptions, ...options }),
};
