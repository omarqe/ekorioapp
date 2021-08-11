import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home";

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [{ name: "home", component: HomeScreen }];

    return _renderStacks(HomeStack, screens, options);
};

export default HomeStackScreen;
