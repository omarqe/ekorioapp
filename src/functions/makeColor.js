export default function makeColor(value, over) {
    const x = 7 - Math.floor((value / over) * 7);
    const text = ["#fff", "#fff", "#687300", "#948500", "#7A5C00", "#FFF6D9", "#fff", "#fff"];
    const background = ["#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#F44336"];

    return { text: text[x], background: background[x] };
}
