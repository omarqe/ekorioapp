import axios from "axios";

const http = axios.create({
    baseURL: process.env.DEVENV === "portable" ? process.env.API_HOST_PORTABLE : process.env.API_HOST,
});

export default http;
