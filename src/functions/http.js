import axios from "axios";
export default axios.create({
    baseURL: process.env.API_HOST,
    headers: {
        Authorization: `Bearer ${process.env.API_SECRET}`,
    },
});
