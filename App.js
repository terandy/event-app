import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyNavigator } from './src/navigator';
import { NotificationProvider } from './src/context';

function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <MyNavigator />
      </NavigationContainer>
    </NotificationProvider>
  );
}
export default App;
