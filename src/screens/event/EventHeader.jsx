import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../context';
import { DAYS_OF_THE_WEEK } from '../../data';
import { Title, IconButton } from '../../elements';
import { extractDate, extractTime, handleInterestPress } from '../../utils';

const Header = ({ event, navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const { title, dateTime, frequency, users, id, creator, isRecurring } = event;

  const displayDate = extractDate(dateTime);
  const displayTime = extractTime(dateTime);

  const isInterested =
    users && currentUser ? users.includes(currentUser.id) : false;

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 24
        }}
      >
        <Title
          size="large"
          style={{ flex: 0.8, marginBottom: 5, marginTop: 5 }}
        >
          {title}
        </Title>
        {currentUser.id === creator && (
          <IconButton
            icon="pencil"
            color={colors.p1}
            onPress={() => navigation.navigate('Edit Event', { id })}
          />
        )}
      </View>
      <Text style={{ color: colors.p2, fontSize: 14 }}>
        {`${
          isRecurring
            ? frequency == 'WEEKLY'
              ? `Every ${DAYS_OF_THE_WEEK[dateTime.toDate().getDay()]} `
              : `${frequency} - ${displayDate}`
            : displayDate
        } - ${displayTime}`}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <IconButton
          onPress={() => handleInterestPress(currentUser, event, isInterested)}
          title={isInterested ? 'Interested' : 'Show Interest'}
          icon={isInterested ? 'star' : 'star-outline'}
          color={colors.p2}
          style={{ marginLeft: -6 }}
        />
      </View>
    </View>
  );
};

export default Header;
