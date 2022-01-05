import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { NotificationContext } from '../../context';

function HomeScreen() {
  const { expoPushToken, sendPushNotification } =
    useContext(NotificationContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>Home Screen</Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <Button
          title="Press to Send Notification"
          disabled={!expoPushToken}
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
