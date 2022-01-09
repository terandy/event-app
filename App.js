import React, { useContext } from 'react';
import { LogBox, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';

import { NotificationProvider, AuthProvider, AuthContext } from './src/context';
import { MyNavigator, AuthNavigator } from './src/navigator';
import { theme } from './src/theme';

LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release'
]);
LogBox.ignoreLogs(['Setting a timer']);

function App() {
  const { hasAuthState, currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const isLoggedIn = !!currentUser;

  if (!hasAuthState) {
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
    </View>;
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
