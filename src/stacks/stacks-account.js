import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/account";
import AccountSettingsScreen from "../screens/account/settings";
import AccountPasswordScreen from "../screens/account/password";
import AccountReferralScreen from "../screens/account/referral";

const Stack = createStackNavigator();
const AccountStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [
        { name: "account", component: AccountScreen },
        { name: "account__settings", component: AccountSettingsScreen },
        { name: "account__password", component: AccountPasswordScreen },
        { name: "account__referral", component: AccountReferralScreen },
    ];

    return _renderStacks(Stack, screens, options);
};

export default AccountStacks;
