import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { EventContext, AuthContext } from '../../context';
import { Button, Title, Layout, Loading } from '../../elements';
import { EventCard } from '../../components';

function EventListScreen({ navigation }) {
  const { selectedCity } = useContext(AuthContext);
  const { events } = useContext(EventContext);
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const [showMore, setShowMore] = useState(false);

  const upcomingEvents = events?.filter((event) => {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    return (
      currentUser &&
      (!currentUser.blockedUsers ||
        !currentUser.blockedUsers.includes(event.creator)) &&
      event.cities.includes(selectedCity) &&
      !event.isRecurring &&
      event.dateTime.toDate() >= today
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
    navigation.navigate('Event', { id });
  };

  const renderNoEvents = () => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
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
            title={showMore ? 'Show Less' : 'Show More'}
            size="xsmall"
            color={colors.p2}
            onPress={() => setShowMore(!showMore)}
            style={{
              marginTop: 12,
              borderColor: colors.p2,
              backgroundColor: 'white'
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
