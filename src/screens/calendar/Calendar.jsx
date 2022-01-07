import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';

import { Title, Layout } from '../../elements';
import { extractCalendarDate, formatCalendarDate } from '../../utils';

function CalendarScreen() {
  const { colors } = useTheme();
  const initialDate = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState({
    month: initialDate.getMonth() + 1,
    year: initialDate.getFullYear(),
    dateString: formatCalendarDate(initialDate)
  });
  const [markedDates, setMarkedDates] = useState({});
  const [dailyEvents, setDailyEvents] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day);
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
  return (
    <Layout>
      <Calendar
        current={initialDate.toDateString()}
        onMonthChange={handleDayPress}
        onDayPress={handleDayPress}
        markingType={'multi-dot'}
        markedDates={addSelectedDateToMarkedDates(markedDates, selectedDate)}
      />
    </Layout>
  );
}

export default CalendarScreen;
