import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useNavigationBuilder,
  DrawerRouter,
  createNavigatorFactory
} from '@react-navigation/native';
import { Drawer } from '../components';

const MyNavigationContent = ({
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
            <View key={route.key} style={[StyleSheet.absoluteFill]}>
              {descriptors[route.key].render()}
            </View>
          ) : null;
        })}
      </View>
      <Drawer navigation={navigation} state={state} descriptors={descriptors} />
    </NavigationContent>
  );
};

export const createMyNavigator = createNavigatorFactory(MyNavigationContent);
