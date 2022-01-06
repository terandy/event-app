import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as firebase from 'firebase';
import Constants from 'expo-constants';

import { NotificationProvider } from './src/context';
import { MyNavigator } from './src/navigator';
import { theme } from './src/theme';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  measurementId: Constants.manifest.extra.measurementId,
  appId: Constants.manifest.extra.appId
};

const hasNotBeenInitialized = firebase.apps?.length === 0;
if (hasNotBeenInitialized) {
  firebase.initializeApp(firebaseConfig);
}

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
