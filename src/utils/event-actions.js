import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import {
  removeEventFromUsers,
  removeUserFromEvent,
  addEventToUser,
  addUserToEvent,
  getEvent
} from '../firebase-api';
const removeEventFromCalendar = async (currentUser, event) => {
  const userEvent = currentUser.events.find((evt) => evt.eventId === event.id);
  if (userEvent) {
    const { calendarEventId } = userEvent;
    Calendar.deleteEventAsync(calendarEventId, { futureEvents: true });
    return calendarEventId;
  }
};

const addEventToCalendar = async (currentUser, event) => {
  const { title, dateTime, frequency, id } = event;
  const startDate = new Date(dateTime);
  const endDate = new Date(dateTime.setHours(startDate.getHours() + 1));
  const details = {
    title,
    startDate,
    endDate,
    timeZone: Localization.timeZone,
    alarms: [
      {
        relativeOffset: 0
      },
      { relativeOffset: -currentUser.settings.reminderTime }
    ],
    recurrenceRule: {
      ...(frequency &&
        frequency !== '' && { frequency: Calendar.Frequency[frequency] })
    }
  };
  try {
    const calendarEventId = await Calendar.createEventAsync(
      currentUser.calendarId,
      details
    );
    return calendarEventId;
  } catch (err) {
    console.log(err);
  }
};

export const handleInterestPress = async (currentUser, event, isInterested) => {
  if (isInterested) {
    try {
      const calendarEventId = await removeEventFromCalendar(currentUser, event);
      removeEventFromUsers({ eventId: event.id, calendarEventId });
      removeUserFromEvent({ eventId: event.id });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const calendarEventId = await addEventToCalendar(currentUser, {
        ...event,
        dateTime: event.dateTime.toDate()
      });
      addEventToUser({ eventId: event.id, calendarEventId });
      addUserToEvent({ eventId: event.id });
    } catch (err) {
      console.log(err);
    }
  }
};
export const updateCalendarTimes = (currentUser, reminderTime) => {
  const calendarEventIds = currentUser.events.map(
    (event) => event.calendarEventId
  );
  const alarms = [
    {
      relativeOffset: 0
    },
    { relativeOffset: -reminderTime }
  ];
  try {
    calendarEventIds.forEach((id) => Calendar.updateEventAsync(id, { alarms }));
  } catch (err) {
    console.log(err);
  }
};

export const handleUpdateEvent = async (currentUser, event) => {
  try {
    const oldCalEvtId = await removeEventFromCalendar(currentUser, event);
    removeEventFromUsers({
      eventId: event.id,
      calendarEventId: oldCalEvtId
    });
    const newCalEvtId = await addEventToCalendar(currentUser, event);
    addEventToUser({ eventId: event.id, calendarEventId: newCalEvtId });
  } catch (err) {
    console.log(err);
  }
};

export const handleUpdateEventFromNotification = async ({
  currentUser,
  eventId
}) => {
  try {
    const doc = await getEvent({ id: eventId });
    if (doc.exists) {
      const event = doc.data();
      handleUpdateEvent(currentUser, {
        ...event,
        dateTime: event.dateTime.toDate()
      });
    }
  } catch (err) {
    console.log(err);
  }
};
