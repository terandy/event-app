import {
  SettingsScreen,
  InfoScreen,
  EventScreen,
  EditEventScreen,
  DeleteEventScreen,
  CreateEventScreen,
  Eula,
  BlockUserScreen,
  DonateScreen,
} from '../screens';
import TabNavigator from './TabNavigator';
import { createMyNavigator } from './createMyNavigator';

const My = createMyNavigator();

function MyNavigator() {
  return (
    <My.Navigator>
      <My.Screen
        name="Home"
        component={TabNavigator}
        options={{ title: 'Home', hide: true }}
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
      <My.Screen
        name="Edit Event"
        component={EditEventScreen}
        options={{ title: 'Edit Event', hide: true }}
      />
      <My.Screen
        name="Delete Event"
        component={DeleteEventScreen}
        options={{ title: 'Delete Event', hide: true }}
      />
      <My.Screen
        name="Create Event"
        component={CreateEventScreen}
        options={{ title: 'Create Event' }}
      />
      <My.Screen
        name="Eula"
        component={Eula}
        options={{ title: 'Eula', hide: true }}
      />
      <My.Screen
        name="Block User"
        component={BlockUserScreen}
        options={{ title: 'Block User', hide: true }}
      />
      <My.Screen
        name="Donate"
        component={DonateScreen}
        options={{ title: 'Donate' }}
      />
    </My.Navigator>
  );
}

export default MyNavigator;
