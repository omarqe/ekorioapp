import "dotenv/config";

export default {
    name: "Ekorio",
    version: "1.0.0",
    extra: {
        API_HOST: process.env.API_HOST,
        API_SECRET: process.env.API_SECRET,
    },
};
