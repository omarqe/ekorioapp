import _some from "lodash/some";
import _values from "lodash/values";

export default function hasMissingDataToVerify(data) {
    return _values(data).some((x) => x === undefined || x === null);
}
