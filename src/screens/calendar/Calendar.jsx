// TODO: Add end date for multiple day events

import { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { HAT_COLORS } from "../../data";
import { RS } from "../../strings";
import { EventContext, AuthContext } from "../../context";
import { Layout, Loading } from "../../elements";
import { formatCalendarDate, isSameDay } from "../../utils";
import CalendarDrawer from "./CalendarDrawer";

function CalendarScreen({ navigation }) {
  const { colors } = useTheme();
  const { selectedCity } = useContext(AuthContext);
  const { events } = useContext(EventContext);
  const initialDate = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState({
    day: initialDate.getDate(),
    month: initialDate.getMonth() + 1,
    year: initialDate.getFullYear(),
    dateString: formatCalendarDate(initialDate),
  });
  const [markedDates, setMarkedDates] = useState({});
  const [height, setHeight] = useState(400);

  // Events filtered by the selected city
  let filteredEvents = [];

  // Events happenning today in the filtered events
  let dailyEvents = [];

  if (events) {
    filteredEvents = events.filter((event) =>
      event.cities.includes(selectedCity)
    );

    if (filteredEvents.length > 0) {
      dailyEvents = filteredEvents
        .filter((event) => {
          const date = new Date(
            selectedDate.year,
            selectedDate.month - 1,
            selectedDate.day
          );

          // We just need the day and not the time, so the calculation later will not have problems
          let tempDate = new Date(
            (event.startDateTime ?? event.dateTime).toDate()
          );
          const eventStartDate = new Date(
            tempDate.getFullYear(),
            tempDate.getMonth(),
            tempDate.getDate()
          );
          let eventEndDate;
          if (event.isMultiday) {
            tempDate = new Date(event.endDateTime.toDate());
            eventEndDate = new Date(
              tempDate.getFullYear(),
              tempDate.getMonth(),
              tempDate.getDate()
            );
          }
          const isHappeningToday =
            isSameDay(
              date,
              eventStartDate,
              event.frequency,
              event.isRecurring
            ) ||
            (event.isMultiday &&
              eventStartDate <= date &&
              eventEndDate >= date);
          return isHappeningToday;
        })
        .sort(function (a, b) {
          return (a.startDateTime ?? a.dateTime)
            .toDate()
            .toTimeString()
            .localeCompare(
              (b.startDateTime ?? b.dateTime).toDate().toTimeString()
            );
        });
    }
  }

  const handleDayPress = (day) => setSelectedDate(day);

  const handleEventPress = (id) => navigation.navigate(RS.event, { id });

  const addSelectedDateToMarkedDates = (preMarkedDates, selectedDate) => {
    const newMarkedDates = { ...preMarkedDates };
    newMarkedDates[selectedDate.dateString] = {
      ...preMarkedDates[selectedDate.dateString],
      selected: true,
      disableTouchEvent: true,
      selectedColor: colors.p3,
      selectedTextColor: "black",
    };
    return newMarkedDates;
  };

  useEffect(() => {
    if (filteredEvents.length > 0) {
      const newMarkedDates = {};
      const getColor = (event) => colors[HAT_COLORS[event.hats[0] || "p1"]];
      const addEvent = (event, date) => {
        if (newMarkedDates[date]) {
          newMarkedDates[date].dots.push({
            color: getColor(event),
          });
        } else {
          newMarkedDates[date] = {
            dots: [
              {
                color: getColor(event),
              },
            ],
          };
        }
      };

      filteredEvents.forEach((event) => {
        const eventStartDate = (event.startDateTime ?? event.dateTime).toDate();
        let eventEndDate;
        if (event.isMultiday) {
          let temp = event.endDateTime.toDate();
          eventEndDate = new Date(
            temp.getFullYear(),
            temp.getMonth(),
            temp.getDate()
          );
        }
        if (event.frequency !== "" || event.isMultiday) {
          for (let i = -7; i < 40; i++) {
            const date = new Date(selectedDate.year, selectedDate.month - 1, i);
            if (
              isSameDay(
                date,
                eventStartDate,
                event.frequency,
                event.isRecurring
              ) ||
              (event.isMultiday &&
                date >= eventStartDate &&
                date <= eventEndDate)
            ) {
              addEvent(event, formatCalendarDate(date));
            }
          }
        } else {
          addEvent(event, formatCalendarDate(eventStartDate));
        }
      });
      setMarkedDates(newMarkedDates);
    }
  }, [selectedDate.month, filteredEvents.length]);

  if (!events) {
    return <Loading />;
  }

  return (
    <Layout>
      <View
        style={style.container}
        onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      >
        <Calendar
          current={initialDate.toDateString()}
          onMonthChange={handleDayPress}
          onDayPress={handleDayPress}
          markingType={"multi-dot"}
          markedDates={addSelectedDateToMarkedDates(markedDates, selectedDate)}
          style={[style.calendar]}
        />
        <CalendarDrawer
          dailyEvents={dailyEvents}
          selectedDate={selectedDate.dateString}
          handleEventPress={handleEventPress}
          maxHeight={height}
        />
      </View>
    </Layout>
  );
}

const style = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  calendar: {
    margin: 20,
  },
});

export default CalendarScreen;
