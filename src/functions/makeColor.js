export default function makeColor(value, over) {
    const x = 7 - Math.floor((value / over) * 7);
    const text = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
    const background = ["#388E3C", "#689F38", "#AFB42B", "#FBC02D", "#FFA000", "#F57C00", "#E64A19", "#D32F2F"];

    return { text: text[x], background: background[x] };
}
