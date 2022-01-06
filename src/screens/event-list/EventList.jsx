import { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { NotificationContext } from '../../context';
import { Button, Title, Layout } from '../../elements';
import { Loading } from '../../components';
import { getEvents } from '../../api';

function EventListScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState({});
  console.log(events);
  const { expoPushToken, sendPushNotification } =
    useContext(NotificationContext);

  useEffect(() => {
    const callback = (doc) => {
      if (doc.data()) {
        setEvents(doc.data());
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    const error = () => {
      console.log('Error getting document:', error);
      setIsLoading(false);
    };
    const unsubscribe = getEvents(callback, error);
    return unsubscribe;
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
