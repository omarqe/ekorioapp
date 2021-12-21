import axios from "axios";

const http = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.API_HOST : process.env.API_HOST_PORTABLE,
});

export default http;
