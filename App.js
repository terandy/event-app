import React, { useContext, useEffect } from 'react';
import { LogBox, ActivityIndicator, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import { NotificationProvider, AuthProvider, AuthContext } from './src/context';
import { MyNavigator, AuthNavigator } from './src/navigator';
import { theme } from './src/theme';

LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release'
]);
LogBox.ignoreLogs(['Setting a timer']);

function App() {
  const { hasAuthState, isLoggedIn } = useContext(AuthContext);
  const { colors } = useTheme();
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'ios') {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          console.log('Yay! I have user permission to track data');
        }
      }
    })();
  }, []);

  if (!hasAuthState) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.p1
        }}
      >
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color={colors.p1}
        />
      </View>
    );
  }
  if (!isLoggedIn) {
    return <AuthNavigator />;
  }
  return <MyNavigator />;
}

export default () => (
  <AuthProvider>
    <NotificationProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </NotificationProvider>
  </AuthProvider>
);
