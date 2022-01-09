import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Title } from '../../elements';
import { EventDrawerCard } from '../../components';
import { padding } from '../../theme';

const CalendarDrawer = ({ dailyEvents, selectedDate, handleEventPress }) => {
  const { colors } = useTheme();
  return (
    <View style={[style.container, { backgroundColor: colors.p1 }]}>
      <Title size="large" color="white" style={style.title}>
        {selectedDate || 'No Events'}
      </Title>
      <ScrollView>
        {dailyEvents?.map((event) => (
          <EventDrawerCard
            key={event.id}
            event={event}
            onPress={handleEventPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: padding.xsmall,
    borderTopEndRadius: padding.medium,
    borderTopStartRadius: padding.medium,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    maxHeight: 500
  },
  title: { paddingLeft: padding.medium }
});

export default CalendarDrawer;
