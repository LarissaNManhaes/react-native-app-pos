import { createStackNavigator } from '@react-navigation/stack';
import Register from "../screens/Register";
import Reset from "../screens/Reset";

const Stack = createStackNavigator();

export function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Reset" component={Reset} />
    </Stack.Navigator>
  );
}



