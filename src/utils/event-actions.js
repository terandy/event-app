import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  removeEventFromUsers,
  removeUserFromEvent,
  addEventToUser,
  addUserToEvent,
  getEvent
} from '../firebase-api';

export const getTrigger = ({ time, frequency, isRecurring }) => {
  console.log('getTrigger', time, frequency);
  let trigger;
  if (isRecurring) {
    switch (frequency) {
      case 'DAILY':
        trigger = {
          repeats: true,
          hour: time.getHours(),
          minute: time.getMinutes()
        };
        break;
      case 'WEEKLY':
        trigger = {
          repeats: true,
          weekday: time.getDay() + 1,
          hour: time.getHours(),
          minute: time.getMinutes()
        };
        break;
      case 'MONTHLY':
        trigger =
          Platform.OS === 'ios'
            ? {
                repeats: true,
                day: time.getDate(),
                hour: time.getHours(),
                minute: time.getMinutes()
              }
            : time;
        break;
      case 'YEARLY':
        trigger = {
          repeats: true,
          month: time.getMonth() + 1,
          day: time.getDate(),
          hour: time.getHours(),
          minute: time.getMinutes()
        };
        break;
      default:
        trigger = time;
        break;
    }
  } else {
    trigger =
      Platform.OS === 'ios'
        ? {
            repeats: false,
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            day: time.getDate(),
            hour: time.getHours(),
            minute: time.getMinutes()
          }
        : time;
  }
  console.log({ trigger });
  return trigger;
};

export const scheduleReminderNotification = async (
  { title, id, dateTime, frequency, isRecurring },
  currentUser
) => {
  const rt = currentUser.settings.reminderTime;
  startTime = dateTime.toDate ? dateTime.toDate() : dateTime;
  const reminderTime = new Date(startTime.getTime() - rt * 60 * 1000);
  const trigger = getTrigger({ time: reminderTime, frequency, isRecurring });
  const reminderId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: `Starting in ${rt} minutes`,
      data: { id }
    },
    trigger
  });
  console.log({ reminderId });
  return { reminderId };
};

export const scheduleEventNotification = async ({
  title,
  id,
  dateTime,
  frequency,
  isRecurring
}) => {
  startTime = dateTime.toDate ? dateTime.toDate() : dateTime;
  const trigger = getTrigger({ time: startTime, frequency, isRecurring });
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: 'Starting now!',
      data: { id }
    },
    trigger
  });
  return { notificationId };
};

export const cancelScheduledNotification = async (id) => {
  try {
    Notifications.cancelScheduledNotificationAsync(id);
  } catch (err) {
    console.log(err);
  }
};

// For dev purposes
export const getAllScheduledNotification = async () => {
  const all = await Notifications.getAllScheduledNotificationsAsync();
  console.log(
    all.map((not) => ({
      title: not.content.title,
      id: not.identifier,
      time: `${new Date(not.trigger.value).getHours()}:${new Date(
        not.trigger.value
      ).getMinutes()}`,
      frequency: not.trigger
    }))
  );
};

// For dev purposes
export const removeAllScheduledNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const showInterest = async ({ event, currentUser }) => {
  try {
    // local notification
    const { notificationId } = await scheduleEventNotification(event);
    const { reminderId } = await scheduleReminderNotification(
      event,
      currentUser
    );
    // saving notification Ids to firestore
    addEventToUser({
      eventId: event.id,
      reminderId,
      notificationId
    });
    addUserToEvent({ eventId: event.id });
  } catch (err) {
    console.log(err);
  }
};

export const hideInterest = async ({ event, currentUser }) => {
  const thisEvent = currentUser.events.find((evt) => evt.eventId === event.id);
  const { reminderId, notificationId } = thisEvent;
  try {
    // local notification
    cancelScheduledNotification(notificationId);
    cancelScheduledNotification(reminderId);
    // removing notification Ids from firestore
    removeEventFromUsers({ eventId: event.id, reminderId, notificationId });
    removeUserFromEvent({ eventId: event.id });
  } catch (err) {
    console.log(err);
  }
};

export const handleInterestPress = async (currentUser, event, isInterested) => {
  if (isInterested) {
    hideInterest({ event, currentUser });
  } else {
    showInterest({ event, currentUser });
  }
};
export const updateReminderTimes = async (currentUser, events) => {
  currentUser.events.forEach(
    async ({ notificationId, reminderId: oldReminderId, eventId }) => {
      cancelScheduledNotification(oldReminderId);
      const thisEvent = events.find((evt) => evt.id === eventId);
      const { reminderId } = await scheduleReminderNotification(
        thisEvent,
        currentUser
      );
      removeEventFromUsers({
        eventId,
        reminderId: oldReminderId,
        notificationId
      });
      addEventToUser({ eventId, reminderId, notificationId });
    }
  );
};

export const handleUpdateEvent = async (currentUser, event) => {
  await hideInterest({ event, currentUser });
  showInterest({ event, currentUser });
};

export const handleUpdateEventFromNotification = async ({
  currentUser,
  eventId
}) => {
  try {
    const doc = await getEvent({ id: eventId });
    if (doc.exists) {
      const event = doc.data();
      handleUpdateEvent(currentUser, event);
    }
  } catch (err) {
    console.log(err);
  }
};
