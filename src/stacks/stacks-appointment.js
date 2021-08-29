import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import AppointmentScreen from "../screens/appointment";
import AppointmentBookingScreen from "../screens/appointment/booking";
import AppointmentDetailsScreen from "../screens/appointment/details";

const Stack = createStackNavigator();
const VeterinarStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [
        { name: "appointment", component: AppointmentScreen },
        { name: "appointment__booking", component: AppointmentBookingScreen },
        { name: "appointment__details", component: AppointmentDetailsScreen },
    ];

    return _renderStacks(Stack, screens, options);
};

export default VeterinarStacks;
