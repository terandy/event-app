import { createMyNavigator } from './createMyNavigator';
import { SettingsScreen, InfoScreen } from '../../screens';
import TabNavigator from '../TabNavigator';

const My = createMyNavigator();

function MyNavigator() {
  return (
    <My.Navigator>
      <My.Screen
        name="Home"
        component={TabNavigator}
        options={{ title: 'Home' }}
      />
      <My.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <My.Screen
        name="Info"
        component={InfoScreen}
        options={{ title: 'Info' }}
      />
    </My.Navigator>
  );
}

export default MyNavigator;
