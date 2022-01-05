import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/navigator';
import { NotificationProvider } from './src/context';

function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </NotificationProvider>
  );
}
export default App;
