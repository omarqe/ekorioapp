import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home";

const Stack = createStackNavigator();
const HomeStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [{ name: "home", component: HomeScreen }];

    return _renderStacks(Stack, screens, options);
};

export default HomeStacks;
