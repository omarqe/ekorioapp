import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import MeScreen from "../screens/me";
import AccountSettingsScreen from "../screens/me/account-settings";
import AccountPasswordScreen from "../screens/me/account-password";
import ReferralScreen from "../screens/me/referral";

const Stack = createStackNavigator();
const MeStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [
        { name: "me", component: MeScreen },
        { name: "account_settings", component: AccountSettingsScreen },
        { name: "account_password", component: AccountPasswordScreen },
        { name: "referral", component: ReferralScreen },
    ];

    return _renderStacks(Stack, screens, options);
};

export default MeStacks;
