import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NotificationProvider } from './src/context';
import { MyNavigator } from './src/navigator';
import { theme } from './src/theme';

function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <MyNavigator />
        </PaperProvider>
      </NavigationContainer>
    </NotificationProvider>
  );
}
export default App;
