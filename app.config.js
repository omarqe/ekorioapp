import "dotenv/config";
export default {
    name: "Ekorio",
    version: "1.0.0",
    extra: {
        DEVENV: process.env.DEVENV,
        API_HOST: process.env.API_HOST,
        API_SECRET: process.env.API_SECRET,
        API_HOST_PORTABLE: process.env.API_HOST_PORTABLE,
    },
};
