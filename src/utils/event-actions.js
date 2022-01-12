import * as Calendar from 'expo-calendar';

import {
  removeEventFromUsers,
  removeUserFromEvent,
  addEventToUser,
  addUserToEvent
} from '../firebase-api';

export const handleInterestPress = async (currentUser, event, isInterested) => {
  const { title, dateTime, frequency, id } = event;
  if (isInterested) {
    const { calendarEventId } = currentUser.events.find(
      (event) => event.eventId === id
    );
    await Calendar.deleteEventAsync(calendarEventId);

    removeEventFromUsers({ eventId: id, calendarEventId });
    removeUserFromEvent({ eventId: id });
  } else {
    const startDate = dateTime.toDate();
    const endDate = new Date(
      dateTime.toDate().setHours(startDate.getHours() + 1)
    );
    const details = {
      title,
      startDate,
      endDate,
      timeZone: 'America/Toronto',
      alarms: [
        {
          relativeOffset: 0
        },
        { relativeOffset: -currentUser.settings.reminderTime }
      ],
      recurrenceRule: {
        frequency:
          frequency && frequency !== ''
            ? Calendar.Frequency[frequency]
            : undefined
      }
    };
    try {
      const calendarEventId = await Calendar.createEventAsync(
        currentUser.calendarId,
        details
      );
      await addEventToUser({ eventId: id, calendarEventId });
      await addUserToEvent({ eventId: id });
    } catch (err) {
      console.log(err);
    }
  }
};
export const updateCalendarTimes = (currentUser, reminderTime) => {
  const calendarEventIds = currentUser.events.map(
    (event) => event.calendarEventId
  );
  const details = {
    alarms: [
      {
        relativeOffset: 0
      },
      { relativeOffset: -reminderTime }
    ]
  };
  try {
    calendarEventIds.forEach((id) => Calendar.updateEventAsync(id, details));
  } catch (err) {
    console.log(err);
  }
};

export const handleUpdateEvent = async (currentUser, event) => {
  const { title, dateTime, frequency, id } = event;
  const { calendarEventId } = currentUser.events.find(
    (event) => event.eventId === id
  );
  const startDate = dateTime.toDate();
  const endDate = new Date(
    dateTime.toDate().setHours(startDate.getHours() + 1)
  );
  const details = {
    title,
    startDate,
    endDate,
    timeZone: 'America/Toronto',
    alarms: [
      {
        relativeOffset: 0
      },
      { relativeOffset: -currentUser.settings.reminderTime }
    ],
    recurrenceRule: {
      frequency:
        frequency && frequency !== ''
          ? Calendar.Frequency[frequency]
          : undefined
    }
  };
  try {
    Calendar.updateEventAsync(calendarEventId, details);
  } catch (err) {
    console.log(err);
  }
};
