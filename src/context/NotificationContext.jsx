import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useCallback,
  useContext
} from 'react';
import { Platform } from 'react-native';
import { apiSaveToken, addCalendarIdToUser } from '../firebase-api';
import { getCalendarByName, createCalendar } from '../utils';
import { CALENDAR_NAME } from '../data';
import { AuthContext } from './AuthContext';

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
    registerForPushNotificationsAsync().then((token) => apiSaveToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // This listener is fired whenever a notification is received while the app is foregrounded
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendar = await getCalendarByName(CALENDAR_NAME);
          if (!calendar) {
            const newCalendarId = await createCalendar();
            addCalendarIdToUser(newCalendarId);
          } else if (
            !currentUser.calendarId ||
            currentUser.calendarId !== calendar.id
          ) {
            addCalendarIdToUser(calendar.id);
          }
        }
      })();
    }
  }, [currentUser]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

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
