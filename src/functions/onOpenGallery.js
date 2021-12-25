import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export default async function onOpenGallery(set, setBase64) {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        aspect: [1, 1],
    });
    if (!result.cancelled) {
        if (typeof set === "function") set(result.uri);
        if (typeof setBase64 === "function") {
            FileSystem.readAsStringAsync(result.uri, { encoding: "base64" }).then((base64) => {
                setBase64(base64);
            });
        }
    }
}
