import { useContext } from "react";
import { AuthContext } from "../context";
import {
  SettingsScreen,
  InfoScreen,
  EventScreen,
  EditEventScreen,
  DuplicatePastEventsScreen,
  DeleteEventScreen,
  CreateEventScreen,
  Eula,
  BlockUserScreen,
  DonateScreen,
  Login,
  Register,
  Landing,
} from "../screens";
import { RS } from "../strings";
import TabNavigator from "./TabNavigator";
import { createMyNavigator } from "./createMyNavigator";

const My = createMyNavigator();

function MyNavigator() {
  const { isLoggedIn } = useContext(AuthContext);
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
        options={{ title: "Settings", hide: !isLoggedIn }}
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
        name={RS.duplicatePastEvents}
        component={DuplicatePastEventsScreen}
        options={{ title: "Duplicate Past Events", hide: true }}
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
      <My.Screen
        name={RS.landing}
        component={Landing}
        options={{ title: "Landing", hide: true }}
      />
      <My.Screen
        name={RS.register}
        component={Register}
        options={{ title: "Register", hide: isLoggedIn }}
      />
      <My.Screen
        name={RS.login}
        component={Login}
        options={{ title: "Login", hide: isLoggedIn }}
      />
    </My.Navigator>
  );
}

export default MyNavigator;
