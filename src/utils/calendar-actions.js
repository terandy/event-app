import * as Calendar from 'expo-calendar';
import { CALENDAR_NAME } from '../data';

export const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

export const createCalendar = async () => {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: CALENDAR_NAME };
  const newCalendarId = await Calendar.createCalendarAsync({
    title: CALENDAR_NAME,
    color: '#5F40F7',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER
  });
  return newCalendarId;
};

export const getCalendarByName = async (calendarName) => {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  const calendar = calendars.find((cal) => cal.title === calendarName);
  return calendar;
};
