import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { Title, Line, Loading, Layout } from '../../elements';
import { Comment } from '../../components';
import { fetchEvent } from '../../firebase-api';
import Header from './EventHeader';
import Details from './EventDetails';
import EventImage from './EventImage';
import CommentInput from './CommentInput';
import { padding } from '../../theme';

const Event = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState({});

  const id = route.params?.id;

  useEffect(() => {
    if (id) {
      let unsubscribe = () => {};
      const callback = async () => {
        unsubscribe = await fetchEvent(
          { id },
          (doc) => {
            if (doc.data()) {
              setEvent(doc.data());
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (err) => {
            console.log(err);
            setIsLoading(false);
          }
        );
      };
      callback();
      return () => unsubscribe();
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1
        }}
      >
        <ScrollView style={{ paddingHorizontal: padding.medium, flex: 1 }}>
          <Header event={event} navigation={navigation} />
          <EventImage event={event} />
          <Details
            event={event}
            blockUser={({ user }) => {
              navigation.navigate('Block User', { userId: user.id });
            }}
          />
          <Line style={{ marginVertical: 20 }} />
          <Title style={{ marginBottom: 20 }}>Comments</Title>
          {event.messages?.map((message, index) => (
            <View style={{ marginBottom: 12 }} key={`${index}`}>
              <Comment
                comment={message}
                blockUser={() => {
                  navigation.navigate('Block User', {
                    userId: message.user
                  });
                }}
              />
            </View>
          ))}
        </ScrollView>
        <CommentInput event={event} />
      </KeyboardAvoidingView>
    </Layout>
  );
};

const style = StyleSheet.create({
  layout: { paddingHorizontal: 0 }
});

export default Event;
