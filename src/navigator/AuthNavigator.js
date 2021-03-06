import { createStackNavigator } from '@react-navigation/stack';
import { Landing, Login, Register, Eula } from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Eula" component={Eula} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
