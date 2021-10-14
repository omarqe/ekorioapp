import axios from "axios";

const devenv = "coffee";
const http = axios.create({
    baseURL: devenv === "coffee" ? "http://172.20.10.2:3000" : process.env.API_HOST,
    headers: {
        Authorization: `Bearer ${process.env.API_SECRET}`,
    },
});

export default http;
