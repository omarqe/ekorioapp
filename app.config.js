import "dotenv/config";
export default {
    name: "Ekorio",
    slug: "ekorio",
    icon: "./assets/icon.png",
    version: "1.0.0",
    orientation: "portrait",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#1a1424",
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        bundleIdentifier: "com.omenlo.ekorio",
        buildNumber: "1.0.0",
        supportsTablet: true,
    },
    android: {
        package: "com.omenlo.ekorio",
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
    },
    extra: {
        DEVENV: process.env.DEVENV,
        API_SECRET: process.env.API_SECRET,
        API_HOST: process.env.API_HOST,
        API_HOST_DEV: process.env.API_HOST_DEV,
        API_HOST_PORTABLE: process.env.API_HOST_PORTABLE,
    },
};
