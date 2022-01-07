import { useContext, useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { HAT_COLORS } from '../../data';
import { padding } from '../../theme';
import { EventContext, AuthContext } from '../../context';
import { Layout, Loading } from '../../elements';
import { formatCalendarDate, isSameDay } from '../../utils';
import CalendarDrawer from './CalendarDrawer';

function CalendarScreen({ navigation }) {
  const { colors } = useTheme();
  const { selectedCity } = useContext(AuthContext);
  const { events } = useContext(EventContext);
  const initialDate = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState({
    month: initialDate.getMonth() + 1,
    year: initialDate.getFullYear(),
    dateString: formatCalendarDate(initialDate)
  });
  const [markedDates, setMarkedDates] = useState({});

  let filteredEvents = [];
  let dailyEvents = [];

  if (events) {
    filteredEvents = events.filter((event) =>
      event.cities.includes(selectedCity)
    );

    if (filteredEvents.length > 0) {
      dailyEvents = filteredEvents.filter((event) => {
        const date = new Date(
          selectedDate.year,
          selectedDate.month - 1,
          selectedDate.day
        );
        const eventDate = new Date(event.dateTime.toDate());
        return isSameDay(date, eventDate, event.frequency);
      });
    }
  }

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };
  const handleEventPress = (id) => {
    navigation.navigate('Event', { id });
  };
  const addSelectedDateToMarkedDates = (preMarkedDates, selectedDate) => {
    const newMarkedDates = { ...preMarkedDates };
    newMarkedDates[selectedDate.dateString] = {
      ...preMarkedDates[selectedDate.dateString],
      selected: true,
      disableTouchEvent: true,
      selectedColor: colors.p3,
      selectedTextColor: 'black'
    };
    return newMarkedDates;
  };

  useEffect(() => {
    if (filteredEvents.length > 0) {
      const newMarkedDates = {};
      const getColor = (event) => colors[HAT_COLORS[event.hats[0] || 'p1']];
      const addEvent = (event, date) => {
        if (newMarkedDates[date]) {
          newMarkedDates[date].dots.push({
            color: getColor(event)
          });
        } else {
          newMarkedDates[date] = {
            dots: [
              {
                color: getColor(event)
              }
            ]
          };
        }
      };

      filteredEvents.forEach((event) => {
        const eventDate = event.dateTime.toDate();
        if (event.frequency !== '') {
          for (let i = -7; i < 40; i++) {
            const date = new Date(selectedDate.year, selectedDate.month - 1, i);
            if (isSameDay(date, eventDate, event.frequency)) {
              addEvent(event, formatCalendarDate(date));
            }
          }
        } else {
          addEvent(event, formatCalendarDate(eventDate));
        }
      });
      setMarkedDates(newMarkedDates);
    }
  }, [selectedDate.month, filteredEvents.length]);

  if (!events) {
    return <Loading />;
  }

  return (
    <Layout style={style.layout}>
      <View style={style.container}>
        <View style={style.calendar}>
          <Calendar
            current={initialDate.toDateString()}
            onMonthChange={handleDayPress}
            onDayPress={handleDayPress}
            markingType={'multi-dot'}
            markedDates={addSelectedDateToMarkedDates(
              markedDates,
              selectedDate
            )}
          />
        </View>
        <CalendarDrawer
          dailyEvents={dailyEvents}
          selectedDate={selectedDate.dateString}
          handleEventPress={handleEventPress}
        />
      </View>
    </Layout>
  );
}

const style = StyleSheet.create({
  layout: { paddingHorizontal: 0 },
  container: {
    position: 'relative',
    flex: 1
  },
  calendar: {
    marginTop: padding.medium,
    marginHorizontal: padding.medium
  }
});

export default CalendarScreen;
