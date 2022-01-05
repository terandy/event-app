import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { NotificationContext } from '../../context';
import { Layout } from '../../components';

function EventListScreen() {
  const { expoPushToken, sendPushNotification } =
    useContext(NotificationContext);
  return (
    <Layout>
      <Text>Home Screen</Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{}}>
          <Button
            title="Press to Send Notification"
            disabled={!expoPushToken}
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
