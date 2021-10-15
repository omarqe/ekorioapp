import axios from "axios";

const devenv = "home";
const http = axios.create({
    baseURL: devenv === "coffee" ? "http://172.20.10.2:3000" : process.env.API_HOST,
});

export default http;
