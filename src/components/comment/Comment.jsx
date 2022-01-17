import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text, Pressable } from 'react-native';

import { Title, Card } from '../../elements';
import { fetchUser } from '../../firebase-api';

const Comment = ({ comment, blockUser }) => {
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const { user: userId, comment: content, ...rest } = comment;

  useEffect(() => {
    let unsubscribe = () => {};
    const getUser = async () => {
      try {
        unsubscribe = await fetchUser(
          { userId },
          (doc) => {
            setUser(doc.data() ? doc.data() : null);
          },
          (err) => {
            setUser(null);
            console.log(err);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

    return () => {
      setUser(null);
      unsubscribe();
    };
  }, [userId]);
  if (user) {
    return (
      <Card bg={colors.p4} size="small" {...rest}>
        <Pressable
          onLongPress={() => {
            setShowOptions(!showOptions);
          }}
          onPress={() => setShowOptions(false)}
        >
          <Title size="small" style={{ marginBottom: 5 }}>
            {user.name}
          </Title>
          <Text style={{ color: colors.g1 }}>{content}</Text>
        </Pressable>
        {showOptions && (
          <Pressable
            style={{
              backgroundColor: colors.g1,
              padding: 8,
              borderRadius: 8,
              marginTop: 8
            }}
            onPress={() => {
              blockUser(user);
            }}
          >
            <Text style={{ color: colors.r1 }}>Block User</Text>
          </Pressable>
        )}
      </Card>
    );
  }
  return null;
};

export default Comment;
