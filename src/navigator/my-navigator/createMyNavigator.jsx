import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useNavigationBuilder,
  DrawerRouter,
  createNavigatorFactory
} from '@react-navigation/native';
import Drawer, { HEADER_HEIGHT } from './Drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

const DrawerNavigator = ({
  initialRouteName,
  children,
  screenOptions,
  contentStyle
}) => {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(DrawerRouter, {
      children,
      screenOptions,
      initialRouteName
    });
  return (
    <NavigationContent>
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {
          return i === state.index ? (
            <SafeAreaView key={route.key} style={[StyleSheet.absoluteFill]}>
              <View style={{ width: '100%', height: HEADER_HEIGHT }} />
              {descriptors[route.key].render()}
            </SafeAreaView>
          ) : null;
        })}
      </View>
      <Drawer navigation={navigation} state={state} descriptors={descriptors} />
    </NavigationContent>
  );
};

export const createMyNavigator = createNavigatorFactory(DrawerNavigator);
