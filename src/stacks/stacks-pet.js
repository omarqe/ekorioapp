import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import PetScreen from "../screens/pet";

const Stack = createStackNavigator();
const PetStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [{ name: "home", component: PetScreen }];

    return _renderStacks(Stack, screens, options);
};

export default PetStacks;
