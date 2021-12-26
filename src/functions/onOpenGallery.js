import * as ImagePicker from "expo-image-picker";

export default async function onOpenGallery(set) {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        aspect: [1, 1],
    });
    if (!result.cancelled) {
        if (typeof set === "function") set(result.uri);
    }
}
