import { Dimensions, Platform, PixelRatio } from "react-native";

const isIOS = Platform.OS === "ios";
const isIpad = Platform.isPad;
const isAndroid = Platform.OS === "android";

export default {
    IS_IOS: isIOS,
    IS_IPAD: isIpad,
    IS_ANDROID: isAndroid,

    SCREEN_WIDTH: Dimensions.get("window").width,
    SCREEN_HEIGHT: Dimensions.get("window").height,

    IS_MDPI: PixelRatio.get() === 1,
    IS_HDPI: PixelRatio.get() === 1.5,
    IS_XHDPI: PixelRatio.get() === 2,
    IS_2XHDPI: PixelRatio.get() === 3,
    IS_3XHDPI: PixelRatio.get() === 3.5,
    PIXELRATIO: PixelRatio.get(),

    INPUT_TYPES: ["text", "name", "select", "username", "password", "email", "tel", "phone", "number", "url", "textarea"],

    DEFAULT_CALLING_CODE: 60, // Malaysia (+60)
    DEFAULT_ANIMATION_TIMING: 200, // Used in dashboard charts

    BG_BLACK: "#000000",
    BG_WHITE: "#FFFFFF",
    BG_PURPLE_X: "#271f34",
    BG_PURPLE_50: "#f5f1f8",
    BG_PURPLE_100: "#e3dce9",
    BG_PURPLE_200: "#d1c7da",
    BG_PURPLE_300: "#ad9dbc",
    BG_PURPLE_400: "#806c94",
    BG_PURPLE_500: "#533b6b",
    BG_PURPLE_600: "#362549",
    BG_PURPLE_700: "#302140",
    BG_PURPLE_800: "#291d36",
    BG_PURPLE_900: "#1a1424",
    BG_GRAY_50: "#f5f7fa",
    BG_GRAY_100: "#e1e7ed",
    BG_GRAY_200: "#cbd2d9",
    BG_GRAY_300: "#9aa5b1",
    BG_GRAY_400: "#7b8794",
    BG_GRAY_500: "#616e7c",
    BG_GRAY_600: "#52606d",
    BG_GRAY_700: "#3e4c59",
    BG_GRAY_800: "#323f4b",
    BG_GRAY_900: "#1f2933",
    BG_YELLOW_300: "#FFD574",
    BG_YELLOW_500: "#ffb100",
    BG_YELLOW_600: "#d09000",
    BG_YELLOW_700: "#9b7211",
    BG_YELLOW_900: "#4b390d",
    BG_VERIFIED: "#3fc5f0",
    CTA_POSITIVE: "#29bb89",
    CTA_NEGATIVE: "#e2513d",
    CTA_NEUTRAL: "#2c84ff",
    BORDER_FOCUS: "#96BAFF",

    FONT_COLOR: "#323f4b",
    FONT_COLOR_LIGHT: "#616e7c",

    VIEW_PADDING_X: 25,
    VIEW_PADDING_TOP: isIOS ? 10 : 40,

    BODY_RADIUS: 25,
    ACTIVE_OPACITY: 0.55,
    TOPBAR_MIN_HEIGHT: isIOS ? 115 : 95,
    FIELD_BOTTOM_SPACING: 15,
    LOGIN_OTP_TIMEOUT: 60,
    LOGIN_CONTENT_PADDING: 30,
    SHADOW_SM: {
        shadowOpacity: 0.06,
        shadowColor: "#000000",
        shadowRadius: 1.5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 0.5,
    },
    SHADOW_MD: {
        shadowOpacity: 0.08,
        shadowColor: "#000000",
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },
    SHADOW_LG: {
        shadowOpacity: 0.1,
        shadowColor: "#000000",
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    GLOW_PURPLE: {
        shadowOpacity: 0.15,
        shadowColor: "#ad9dbc",
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 3,
    },
};
