import { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { NotificationContext } from '../../context';
import { Button, Title, Layout } from '../../elements';
import { Loading } from '../../components';
import { fetchEvents } from '../../firebase-api';

function EventListScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  console.log({ events });
  const { expoPushToken, sendPushNotification } =
    useContext(NotificationContext);

  const currentTime = new Date();
  const filterEvents = (events) =>
    events.filter((event) => {
      return event.frequency !== '' || event.dateTime.toDate() >= currentTime;
    });

  useEffect(() => {
    const unsubscribe = fetchEvents(
      (snapshot) => {
        if (snapshot.size) {
          let events = snapshot.docs.map((doc) => doc.data());
          const filteredEvents = filterEvents(events);
          setEvents(filteredEvents);
          setIsLoading(false);
        } else {
          setEvents([]);
          setIsLoading(false);
        }
      },
      (err) => {
        console.log({ err });
        setEvents([]);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Title>Home Screen</Title>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View>
          <Button
            title="Press to Send Notification"
            disabled={!expoPushToken}
            size="small"
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          />
        </View>
      </View>
    </Layout>
  );
}

export default EventListScreen;
