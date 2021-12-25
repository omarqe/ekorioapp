import { useState, useEffect } from "react";

export default function getPetImageSrc(filename) {
    const [baseURL, setBaseURL] = useState();
    const imageURL = `${baseURL}/assets/pets/${filename}`;
    useEffect(() => setBaseURL(process.env.API_HOST_DEV), []);

    return imageURL;
}
