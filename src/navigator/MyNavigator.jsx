import { SettingsScreen, InfoScreen, EventScreen } from '../screens';
import TabNavigator from './TabNavigator';
import { createMyNavigator } from './createMyNavigator';

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
      <My.Screen
        name="Event"
        component={EventScreen}
        options={{ title: 'Event', hide: true }}
      />
    </My.Navigator>
  );
}

export default MyNavigator;
