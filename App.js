import React, { useContext } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { NotificationProvider, AuthProvider, AuthContext } from './src/context';
import { MyNavigator, AuthNavigator } from './src/navigator';
import { theme } from './src/theme';
import { Loading } from './src/elements';

LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release'
]);
LogBox.ignoreLogs(['Setting a timer']);

function App() {
  const { hasAuthState, currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const isLoggedIn = !!currentUser;

  if (!hasAuthState) {
    return <Loading color={colors.p1} />;
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
