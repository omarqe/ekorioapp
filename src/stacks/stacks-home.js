import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home";
import NotificationScreen from "../screens/home/notification";
import PetAddScreen from "../screens/pet/add";
import PetHealthRecordsScreen from "../screens/pet/health-records";
import PetHealthDetailsScreen from "../screens/pet/health-details";

const Stack = createStackNavigator();
const PetStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [
        { name: "home", component: HomeScreen },
        { name: "notification", component: NotificationScreen },
        { name: "pet__health-records", component: PetHealthRecordsScreen },
        { name: "pet__health-details", component: PetHealthDetailsScreen },
        { name: "pet__add", component: PetAddScreen },
    ];

    return _renderStacks(Stack, screens, options);
};

export default PetStacks;
