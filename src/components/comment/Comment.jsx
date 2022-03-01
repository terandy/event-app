import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text, Pressable } from 'react-native';

import { Title, Card } from '../../elements';
import { fetchUser } from '../../firebase-api';
import { extractDate, extractTime } from '../../utils';

const Comment = ({ comment, blockUser, prevDate }) => {
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const { user: userId, comment: content, createdDate, ...rest } = comment;

  const thisDate = createdDate.toDate().setHours(0, 0, 0, 0);
  const lastDate = prevDate?.toDate()?.setHours(0, 0, 0, 0);

  const displayDate = extractDate(createdDate);
  const displayTime = extractTime(createdDate);

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
      <View>
        {(!prevDate || thisDate > lastDate) && (
          <Text
            style={{
              color: colors.g2,
              fontSize: 12,
              marginBottom: 4,
              marginTop: 4,
              flex: 1,
              textAlign: 'center'
            }}
          >
            {displayDate}
          </Text>
        )}
        <Card bg={colors.p4} size="small" {...rest}>
          <Pressable
            onLongPress={() => {
              setShowOptions(!showOptions);
            }}
            onPress={() => setShowOptions(false)}
          >
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}
            >
              <Title
                size="small"
                style={{
                  marginBottom: 5
                }}
              >
                {user.name}
              </Title>
              <Text
                style={{
                  color: colors.g2,
                  fontSize: 12
                }}
              >
                {displayTime}
              </Text>
            </View>
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
      </View>
    );
  }
  return null;
};

export default Comment;
