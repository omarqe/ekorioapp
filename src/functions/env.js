import c from "expo-constants";
export default function env(key) {
    return c.manifest.extra[key];
}
