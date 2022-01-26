import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  View
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

import { formatDate } from '../../utils';
import { Title } from '../../elements';
import { EventDrawerCard } from '../../components';
import { padding } from '../../theme';
import { ICON_SIZE } from '../../data';

const CalendarDrawer = ({ dailyEvents, selectedDate, handleEventPress }) => {
  const { colors } = useTheme();

  const heightOptions = {
    inputRange: [0, 1],
    outputRange: [120, 600]
  };
  const spinOptions = {
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'] // <-- any value larger than your content's height
  };
  const anim = useRef(new Animated.Value(0)).current;
  const [drawerState, setDrawerState] = useState('open');

  const date = new Date(selectedDate.replace(/-/g, '/'));
  const title = formatDate(date);

  const openDrawer = () => {
    setDrawerState('transition');
    Animated.timing(anim, {
      toValue: 1,
      duration: 500, // <-- animation duration
      useNativeDriver: false // <-- need to set false to prevent yellow box warning
    }).start(() => {
      setDrawerState('open');
    });
  };
  const closeDrawer = () => {
    setDrawerState('transition');
    Animated.timing(anim, {
      toValue: 0,
      duration: 500, // <-- animation duration
      useNativeDriver: false // <-- need to set false to prevent yellow box warning
    }).start(() => {
      setDrawerState('close');
    });
  };

  const handlePress = () => {
    if (drawerState === 'open') {
      closeDrawer();
    }
    if (drawerState === 'close') {
      openDrawer();
    }
  };

  useEffect(() => {
    openDrawer();
  }, [selectedDate]);

  return (
    <Animated.View
      style={[
        style.container,
        {
          backgroundColor: colors.p1,
          maxHeight: anim.interpolate(heightOptions)
        }
      ]}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 20
        }}
        onPress={handlePress}
      >
        <Title size="large" color="white" style={style.title}>
          {title || 'No Events'}
        </Title>
        <Animated.View
          style={[
            {
              transform: [{ rotate: anim.interpolate(spinOptions) }]
            }
          ]}
        >
          <Icons name="chevron-down" color="white" size={ICON_SIZE.small} />
        </Animated.View>
      </TouchableOpacity>
      <ScrollView>
        {dailyEvents?.map((event) => (
          <EventDrawerCard
            key={event.id}
            event={event}
            onPress={handleEventPress}
          />
        ))}
      </ScrollView>
    </Animated.View>
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
    left: 0
  },
  title: { paddingLeft: padding.medium }
});

export default CalendarDrawer;
