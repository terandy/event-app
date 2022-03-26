import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import { CalendarScreen, EventListScreen } from "../screens";
import { ICON_SIZE } from "../data";
import { RS } from "../strings";

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={RS.home}
      labeled={false}
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: colors.p1,
        tabBarInactiveTintColor: colors.g2,
        tabBarIndicatorStyle: { height: 0 },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          height: ICON_SIZE.medium,
          width: ICON_SIZE.medium,
        },
      }}
      sceneContainerStyle={{ backgroundColor: colors.w1 }}
    >
      <Tab.Screen
        name="EventList"
        component={EventListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={ICON_SIZE.small}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar"
              color={color}
              size={ICON_SIZE.small}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
