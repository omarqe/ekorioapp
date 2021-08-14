import _renderStacks from "../functions/renderStacks";
import { createStackNavigator } from "@react-navigation/stack";

import PetScreen from "../screens/pet";
import PetHealthRecordsScreen from "../screens/pet/health-records";
import PetHealthDetailsScreen from "../screens/pet/health-details";

const Stack = createStackNavigator();
const PetStacks = () => {
    const options = { screenOptions: { headerShown: false } };
    const screens = [
        { name: "pet", component: PetScreen },
        { name: "pet__health-records", component: PetHealthRecordsScreen },
        { name: "pet__health-details", component: PetHealthDetailsScreen },
    ];

    return _renderStacks(Stack, screens, options);
};

export default PetStacks;
