import net from "./net";
import http from "./http";
import _toLower from "lodash/toLower";
import _fetchAppointments from "./fetchAppointments";

export default function fetchServiceTypes(setState, setLoading, setData, setLoadingData) {
    http.get("/appointments/services")
        .then(({ data: services }) => {
            if (services?.length > 0) {
                const routes = services.map(({ id, name: label }, i) => {
                    const key = _toLower(label);
                    if (i === 0 && typeof setData === "function" && typeof setLoadingData === "function") {
                        _fetchAppointments(key, id, {}, setData, setLoadingData);
                    }

                    return { id, key, label };
                });
                setState({ index: 0, routes });
                setLoading(false);
            }
        })
        .catch(({ response }) => net.handleCatch(response, setLoading));
}
