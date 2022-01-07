import { useContext } from 'react';

import { EventContext, AuthContext } from '../../context';
import { Title, Layout, Loading } from '../../elements';
import { EventCard } from '../../components';

function EventListScreen({ navigation }) {
  const { selectedCity } = useContext(AuthContext);
  const { events } = useContext(EventContext);

  const upcomingEvents = events?.filter(
    (event) =>
      event.cities.includes(selectedCity) &&
      (event.frequency !== '' ||
        event.dateTime.toDate() >= new Date(Date.now()))
  );
  const handleEventPress = (id) => {
    navigation.navigate('Event', { id });
  };
  if (!events) {
    return <Loading />;
  }
  return (
    <Layout scrollable>
      <Title size="large">Upcoming Events</Title>
      {upcomingEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          style={{ marginVertical: 8 }}
          onPress={() => handleEventPress(event.id)}
        />
      ))}
    </Layout>
  );
}

export default EventListScreen;
