import { useContext } from 'react';
import { View, Text } from 'react-native';
import { NotificationContext } from '../../context';
import { Button, Title, Layout } from '../../elements';

function EventListScreen() {
  const { expoPushToken, sendPushNotification } =
    useContext(NotificationContext);
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
