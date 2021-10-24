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

    SMALL_SCREEN: Dimensions.get("window").width < 400,
    LOW_RESOLUTION: PixelRatio.get() < 3,

    DATE_FORMAT: "MMMM D YYYY, h:mm:ss",
    DATE_FORMAT_PRETTY: "D MMMM, YYYY",

    INPUT_TYPES: [
        "url",
        "tel",
        "text",
        "date",
        "name",
        "select",
        "email",
        "phone",
        "number",
        "decimal",
        "username",
        "password",
        "textarea",
    ],

    DEFAULT_CALLING_CODE: 60, // Malaysia (+60)
    DEFAULT_ANIMATION_TIMING: 200, // Used in dashboard charts
    WAITING_DEMO: 500,

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

    COLORED_STYLES: {
        red: { base: { backgroundColor: "#FE8F8F" }, text: { color: "#8D2828" } },
        blue: { base: { backgroundColor: "#A2D2FF" }, text: { color: "#3D56B2" } },
        gray: { base: { backgroundColor: "#e1e7ed" }, text: { color: "#52606d" } },
        green: { base: { backgroundColor: "#B1E693" }, text: { color: "#3E7C17" } },
        yellow: { base: { backgroundColor: "#FFD574" }, text: { color: "#C36A2D" } },
        purple: { base: { backgroundColor: "#d1c7da" }, text: { color: "#533b6b" } },
        purple_dark: { base: { backgroundColor: "#533b6b" }, text: { color: "#e3dce9" } },
    },

    FONT_COLOR: "#323f4b",
    FONT_COLOR_LIGHT: "#616e7c",

    VIEW_PADDING_X: 25,
    VIEW_PADDING_TOP: isIOS ? 10 : 40,

    BODY_RADIUS: 25,
    ACTIVE_OPACITY: 0.55,
    TOPBAR_MIN_HEIGHT: isIOS ? 115 : 95,
    FIELD_BOTTOM_SPACING: 15,
    LOGIN_OTP_TIMEOUT: 60 * 2,
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

    STATUS: {
        ACTIVE: "0001",
        PENDING: "0002",
        DELETED: "0003",
        SUSPENDED: "0004",
        DEACTIVATED: "0005",
        CONFIRMED: "0006",
        CANCELLED: "0007",
        COMPLETED: "0008",
    },

    ERRORS: {
        MISSING_VERIFY_DATA: "Some data are missing for verification, please try signing in instead",
    },

    STATES: [
        "Kedah",
        "Penang",
        "Terengganu",
        "Johor",
        "Perlis",
        "Kelantan",
        "Melaka",
        "N. Sembilan",
        "Perak",
        "Pahang",
        "Selangor",
        "Sabah",
        "Sarawak",
        "Kuala Lumpur",
        "Labuan",
        "Putrajaya",
    ],
};
