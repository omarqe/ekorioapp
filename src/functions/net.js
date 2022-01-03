import qs from "qs";
import toast from "./toast";

export default {
    handleCatch: (r, setLoading) => {
        if (typeof setLoading === "function") setLoading(false);
        if (r?.data !== undefined) {
            const hidden = ["Missing or malformed JWT", "You are unauthorised to access this resource"];
            const message = r.data?.response[0]?.message;
            if (hidden.indexOf(message) < 0) {
                toast.show(message);
            }
        }
    },
    data: (input, options = {}) => qs.stringify(input, options),
};
