import qs from "qs";
import toast from "./toast";

export default {
    handleCatch: (r, setLoading) => {
        if (r?.data !== undefined) {
            const message = r.data?.response[0]?.message;
            toast.show(message);
        }
        if (typeof setLoading === "function") {
            setLoading(false);
        }
    },
    data: (input) => qs.stringify(input),
};
