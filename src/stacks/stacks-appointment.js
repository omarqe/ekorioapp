import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import AppointmentScreen from "../screens/appointment";

const Stack = createStackNavigator();
const VeterinarStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [{ name: "appointments", component: AppointmentScreen }];

    return _renderStacks(Stack, screens, options);
};

export default VeterinarStacks;
