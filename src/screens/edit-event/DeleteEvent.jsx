import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Title, Layout, Button, Loading } from '../../elements';
import { apiDeleteEvent } from '../../firebase-api';
import { padding } from '../../theme';

const DeleteEvent = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const id = route.params?.id;

  const deleteEvent = () => {
    setIsLoading(true);
    apiDeleteEvent({ id })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout style={{ paddingHorizontal: 0, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1
        }}
      >
        <View style={{ paddingHorizontal: padding.medium, flex: 1 }}>
          <Title size="large">Delete Event</Title>
          <Title size="medium" style={{ marginBottom: padding.medium }}>
            Are you sure you want to delete the event?
          </Title>
          <Button
            title="Delete"
            onPress={deleteEvent}
            size="small"
            style={{
              backgroundColor: colors.t1,
              marginBottom: 20
            }}
          />
          <Button
            title="Cancel"
            onPress={() => navigation.navigate('Event', { id })}
            size="small"
            color={colors.t1}
            style={{
              borderColor: colors.t1,
              borderWidth: 2,
              backgroundColor: colors.w1,
              marginBottom: 20
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default DeleteEvent;