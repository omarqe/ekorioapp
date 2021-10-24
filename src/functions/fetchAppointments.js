import React from "react";
import CT from "../const";
import Text from "../components/text";

import net from "./net";
import http from "./http";
import status from "./status";
import moment from "moment";
import _isArray from "lodash/isArray";

export default function fetchAppointments(key, data = {}, setData, setLoading, params = {}) {
    const Time = ({ date }) => {
        const d = moment(date);
        return (
            <React.Fragment>
                <Text style={{ fontSize: 13 }}>
                    {d.format(CT.DATE_FORMAT_PRETTY)} <Text style={{ color: CT.BG_GRAY_200 }}>@</Text> {d.format("h:mm")}
                </Text>
                <Text style={{ color: CT.BG_GRAY_500, fontSize: 12, fontWeight: "600" }}>{d.format("a")}</Text>
            </React.Fragment>
        );
    };

    if (params?.excludes !== undefined && _isArray(params?.excludes)) {
        params.excludes = params.excludes.join(",");
    }
    console.log("params", params);

    setLoading(!data[key]);
    http.get(`/appointments/by/custom`, { params })
        .then(({ data: apmts }) => {
            setLoading(false);
            if (apmts?.length > 0) {
                const items = apmts.map(({ id, date, service, pet, status: st, veterinar: vet }) => {
                    return {
                        id,
                        text: <Time date={date} />,
                        badge: { text: status.text(st), color: status.color(st) },
                        subtitle: [vet?.name, vet?.city].join(", "),
                        tags: [
                            { icon: "magic", text: service?.name },
                            { icon: "cat", text: pet?.name },
                        ],
                    };
                });

                console.log("items:", items);
                setData({ ...data, [key]: items });
                return;
            }
            setData({ ...data, [key]: [] });
        })
        .catch(({ response }) => net.handleCatch(response, setLoading));
}
