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
} from "../screens";
import { RS } from "../strings";
import TabNavigator from "./TabNavigator";
import { createMyNavigator } from "./createMyNavigator";

const My = createMyNavigator();

function MyNavigator() {
  return (
    <My.Navigator>
      <My.Screen
        name={RS.home}
        component={TabNavigator}
        options={{ title: "Home", hide: true }}
      />
      <My.Screen
        name={RS.settings}
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <My.Screen
        name={RS.info}
        component={InfoScreen}
        options={{ title: "Info" }}
      />
      <My.Screen
        name={RS.event}
        component={EventScreen}
        options={{ title: "Event", hide: true }}
      />
      <My.Screen
        name={RS.editEvent}
        component={EditEventScreen}
        options={{ title: "Edit Event", hide: true }}
      />
      <My.Screen
        name={RS.deleteEvent}
        component={DeleteEventScreen}
        options={{ title: "Delete Event", hide: true }}
      />
      <My.Screen
        name={RS.createEvent}
        component={CreateEventScreen}
        options={{ title: "Create Event" }}
      />
      <My.Screen
        name={RS.eula}
        component={Eula}
        options={{ title: "Eula", hide: true }}
      />
      <My.Screen
        name={RS.blockUser}
        component={BlockUserScreen}
        options={{ title: "Block User", hide: true }}
      />
      <My.Screen
        name={RS.donate}
        component={DonateScreen}
        options={{ title: "Donate" }}
      />
    </My.Navigator>
  );
}

export default MyNavigator;
