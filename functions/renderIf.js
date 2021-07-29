export default function renderIf(condition = true, t = null, f = null) {
    return condition ? t : f;
}