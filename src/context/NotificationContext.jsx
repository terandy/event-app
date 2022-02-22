import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, createContext, useContext } from 'react';
import { Platform } from 'react-native';
import { apiSaveToken } from '../firebase-api';
import { handleUpdateEventFromNotification } from '../utils';
import { AuthContext } from './AuthContext';
import * as RootNavigation from '../navigator/RootNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (currentUser) {
      registerForPushNotificationsAsync().then((token) => apiSaveToken(token));

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          // This listener is fired whenever a notification is received while the app is foregrounded
          const eventId = notification.request.content.data.id;
          const shouldUpdate =
            notification.request.content.body.includes('update');
          if (eventId) {
            if (shouldUpdate)
              handleUpdateEventFromNotification({ currentUser, eventId });
          }
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
          const eventId = response.notification.request.content.data.id;
          const shouldUpdate =
            response.notification.request.content.body.includes('update');
          if (eventId) {
            if (shouldUpdate)
              handleUpdateEventFromNotification({ currentUser, eventId });
            RootNavigation.navigate('Event', { id: eventId });
          }
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [currentUser]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  return token;
}
