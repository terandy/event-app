import React, { useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { View, Pressable, Text } from 'react-native';

import { AuthContext } from '../../context';
import { Title, IconButton, Card, HatCircles } from '../../elements';
import { DAYS_OF_THE_WEEK } from '../../data';
import { extractDate, extractTime, handleInterestPress } from '../../utils';

const EventCard = ({ event, style, onPress }) => {
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const { id, title, description, hats, dateTime, frequency, users } = event;

  const displayDate = extractDate(dateTime);
  const displayTime = extractTime(dateTime);

  const isInterested =
    users && currentUser ? users.includes(currentUser.id) : false;

  return (
    <Card bg={colors.p4} style={style}>
      <Pressable onPress={onPress}>
        <View style={{ marginBottom: 18 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Title
                size="medium"
                margin={0}
                style={{ marginBottom: 5, marginRight: 10 }}
              >
                {title}
              </Title>
              <HatCircles hats={hats} />
            </View>
            <IconButton
              onPress={() =>
                handleInterestPress(currentUser, event, isInterested)
              }
              icon={isInterested ? 'star' : 'star-outline'}
              color={colors.p1}
              style={{ marginLeft: -6 }}
            />
          </View>
          <Text style={{ color: colors.p2, fontSize: 13 }}>
            {frequency == ''
              ? displayDate
              : frequency == 'WEEKLY'
              ? `Every ${DAYS_OF_THE_WEEK[dateTime.toDate().getDay()]} `
              : frequency == 'BI-WEEKLY'
              ? `Bi-weekly on ${DAYS_OF_THE_WEEK[dateTime.toDate().getDay()]}s `
              : `${displayDate} - Recurring ${frequency} `}
            - {displayTime}
          </Text>
        </View>
        <Text style={{ color: colors.g1 }}>{description}</Text>
      </Pressable>
    </Card>
  );
};

export default EventCard;
