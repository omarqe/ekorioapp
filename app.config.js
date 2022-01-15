import "dotenv/config";
export default {
    name: "Ekorio",
    slug: "ekorio",
    icon: "./assets/icon.png",
    version: "1.0.1",
    orientation: "portrait",
    plugins: [
        ["expo-image-picker", { photosPermission: "The app accesses your photos to let you share them with your friends." }],
    ],
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
        buildNumber: "1.0.1",
        supportsTablet: true,
        bundleIdentifier: "com.omenlo.ekorio",
        infoPlist: {
            UIBackgroundModes: ["location"],
        },
    },
    android: {
        package: "com.omenlo.ekorio",
        versionCode: 3,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
    },
    extra: {
        API_SECRET: process.env.API_SECRET,
        API_HOST: process.env.API_HOST,
        API_HOST_DEV: process.env.API_HOST_DEV,
        API_HOST_PORTABLE: process.env.API_HOST_PORTABLE,
        REFERRAL_URL: process.env.REFERRAL_URL,
    },
};
