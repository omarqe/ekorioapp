import axios from "axios";

const http = axios.create({
    baseURL: process.env.API_HOST,
});

export default http;
