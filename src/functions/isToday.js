import moment from "moment";

export default function isToday(date) {
    const format = "DD/MM/YYYY";
    const today = moment().format(format);
    const selectedDate = date.format(format);
    return today === selectedDate;
}
