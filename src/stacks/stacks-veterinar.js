import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import VeterinarScreen from "../screens/veterinar";

const Stack = createStackNavigator();
const VeterinarStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [{ name: "veterinars", component: VeterinarScreen }];

    return _renderStacks(Stack, screens, options);
};

export default VeterinarStacks;
