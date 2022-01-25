import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { EventContext, AuthContext } from '../../context';
import { Title, Layout, Loading } from '../../elements';
import { EventCard } from '../../components';

function EventListScreen({ navigation }) {
  const { selectedCity } = useContext(AuthContext);
  const { events } = useContext(EventContext);
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();

  const upcomingEvents = events?.filter((event) => {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    return (
      currentUser &&
      (!currentUser.blockedUsers ||
        !currentUser.blockedUsers.includes(event.creator)) &&
      event.cities.includes(selectedCity) &&
      (event.frequency !== '' || event.dateTime.toDate() >= today)
    );
  });
  const handleEventPress = (id) => {
    navigation.navigate('Event', { id });
  };
  if (!events) {
    return <Loading />;
  }
  return (
    <Layout>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Title size="large">Upcoming Events</Title>
        {upcomingEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            style={{ marginVertical: 8 }}
            onPress={() => handleEventPress(event.id)}
          />
        ))}
        {upcomingEvents.length === 0 && (
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
        )}
      </ScrollView>
    </Layout>
  );
}

export default EventListScreen;
