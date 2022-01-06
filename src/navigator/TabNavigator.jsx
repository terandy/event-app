import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { CalendarScreen, EventListScreen } from '../screens';

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: colors.p1,
        tabBarInactiveTintColor: colors.g2,
        tabBarIndicatorStyle: { height: 0 },
        tabBarShowLabel: false
      }}
      sceneContainerStyle={{ backgroundColor: colors.w1 }}
    >
      <Tab.Screen
        name="EventList"
        component={EventListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
