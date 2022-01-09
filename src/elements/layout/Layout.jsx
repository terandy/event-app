import { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';

import { HEADER_HEIGHT } from '../../data';
import { padding } from '../../theme';
import { AuthContext } from '../../context';

const statusBarHeight = Constants.statusBarHeight;

const Layout = ({ children, style }) => {
  const { colors } = useTheme();
  const { drawerStatus } = useContext(AuthContext);
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={[stylesheet.container, style]}>
        <View style={{ backgroundColor: colors.w1, height: HEADER_HEIGHT }} />
        {children}
      </SafeAreaView>
    );
  }
  return (
    <View style={[stylesheet.container, style]}>
      <View style={{ backgroundColor: colors.w1, height: HEADER_HEIGHT }} />
      {children}
      <StatusBar
        backgroundColor={drawerStatus !== 'close' ? colors.p1 : colors.w1}
      />
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding.medium,
    paddingTop: Platform.OS === 'ios' ? 0 : statusBarHeight,
    backgroundColor: 'white'
  }
});

export default Layout;
