import _find from "lodash/find";
import _toLower from "lodash/toLower";
import _capitalize from "lodash/capitalize";

const statuses = [
    { id: "0001", text: "active", color: "green" },
    { id: "0002", text: "pending", color: "yellow" },
    { id: "0003", text: "deleted", color: "red" },
    { id: "0004", text: "suspended", color: "red" },
    { id: "0005", text: "deactivated", color: "red" },
    { id: "0006", text: "confirmed", color: "green" },
    { id: "0007", text: "cancelled", color: "red" },
    { id: "0008", text: "completed", color: "blue" },
];

export default {
    id: (text) => _find(statuses, { text: _toLower(text) })?.id,
    text: (id) => _capitalize(_find(statuses, { id })?.text),
    color: (id) => _find(statuses, { id })?.color,
};
