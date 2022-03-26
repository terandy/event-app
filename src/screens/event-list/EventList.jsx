// TODO: Update the date and time to startDateTime and endDateTime
//  If there's no way to force the app to update, then it still
//  should accept using "dateTime" until everyone has the latest
//  version of the app

import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
// import Constants from "expo-constants";

import { EventContext, AuthContext } from "../../context";
import { Button, Title, Layout, Loading } from "../../elements";
import { EventCard } from "../../components";
import { RS } from "../../strings";
import { isSameDay } from "../../utils/extract-date";

function EventListScreen({ navigation }) {
  const { selectedCity } = useContext(AuthContext);
  const { events } = useContext(EventContext);
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const [showMore, setShowMore] = useState(false);

  // const version = Constants.manifest.version;

  const todayEvents = events?.filter((event) => {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    const userIsValid =
      currentUser &&
      (!currentUser.blockedUsers ||
        !currentUser.blockedUsers.includes(event.creator));

    const isStartDay = isSameDay(
      (event.startDateTime ?? event.dateTime).toDate(),
      today
    );

    const isOtherDayOfMultidayEvent =
      event.isMultiday &&
      event.startDateTime.toDate() <= today &&
      event.endDateTime.toDate() >= today;
    console.log(isOtherDayOfMultidayEvent);

    return (
      userIsValid &&
      event.cities.includes(selectedCity) &&
      (isStartDay || isOtherDayOfMultidayEvent)
    );
  });

  // With the new "Today" section, upcoming events would count from "tomorrow" not "today"
  const upcomingEvents = events?.filter((event) => {
    const now = new Date(Date.now());
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    return (
      currentUser &&
      (!currentUser.blockedUsers ||
        !currentUser.blockedUsers.includes(event.creator)) &&
      event.cities.includes(selectedCity) &&
      !event.isRecurring &&
      event.dateTime.toDate() >= tomorrow
    );
  });

  const recurringEvents = events?.filter((event) => {
    return (
      currentUser &&
      (!currentUser.blockedUsers ||
        !currentUser.blockedUsers.includes(event.creator)) &&
      event.cities.includes(selectedCity) &&
      event.isRecurring
    );
  });
  const handleEventPress = (id) => {
    navigation.navigate(RS.event, { id });
  };

  const renderNoEvents = () => {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title color={colors.p1} size="small">
          No events to show
        </Title>
      </View>
    );
  };
  if (!events) {
    return <Loading />;
  }
  return (
    <Layout>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Title size="large">Today</Title>
        {todayEvents.map((event) => (
          <EventCard
            key={`home-${event.id}`}
            event={event}
            style={{ marginVertical: 8 }}
            onPress={() => handleEventPress(event.id)}
          />
        ))}
        {todayEvents.length === 0 && renderNoEvents()}

        <Title size="large">Upcoming Events</Title>
        {upcomingEvents.length === 0 && renderNoEvents()}
        {showMore
          ? upcomingEvents.map((event) => (
              <EventCard
                key={`home-${event.id}`}
                event={event}
                style={{ marginVertical: 8 }}
                onPress={() => handleEventPress(event.id)}
              />
            ))
          : upcomingEvents
              .slice(0, 3)
              .map((event) => (
                <EventCard
                  key={`home-${event.id}`}
                  event={event}
                  style={{ marginVertical: 8 }}
                  onPress={() => handleEventPress(event.id)}
                />
              ))}
        {upcomingEvents.length > 3 && (
          <Button
            title={showMore ? "Show Less" : "Show More"}
            size="xsmall"
            color={colors.p2}
            onPress={() => setShowMore(!showMore)}
            style={{
              marginTop: 12,
              borderColor: colors.p2,
              backgroundColor: "white",
            }}
          />
        )}
        <Title size="large">Recurring Events</Title>
        {recurringEvents.map((event) => (
          <EventCard
            key={`home-${event.id}`}
            event={event}
            style={{ marginVertical: 8 }}
            onPress={() => handleEventPress(event.id)}
          />
        ))}
        {recurringEvents.length === 0 && renderNoEvents()}
      </ScrollView>
    </Layout>
  );
}

export default EventListScreen;
