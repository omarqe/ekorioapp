import CT from "../const";
import _moment from "moment";

export default function makeBirthdate(date) {
    return new Date(_moment(date).format(CT.DATE_FORMAT));
}
