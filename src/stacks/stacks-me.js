import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import MeScreen from "../screens/me";

const Stack = createStackNavigator();
const MeStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [{ name: "me", component: MeScreen }];

    return _renderStacks(Stack, screens, options);
};

export default MeStacks;
